import React, {useEffect, useState} from 'react';
import {Reader, Themes, useReader} from "@epubjs-react-native/core";
import {StyleSheet, View} from "react-native";
import {withObservables} from "@nozbe/watermelondb/react";
import {useFileSystem} from "@epubjs-react-native/expo-file-system";
import {translateGoogle} from "../../services/translate.service";
import escapeString from "../../utils/escapeString";
import tempCopyToCache from "../../utils/tempCopyToCache";
import BookDAO from "../../database/DAO/BookDAO";
import useModal from "../../hooks/useModal";
import LoadingSpinner from "../../UI/LoadingSpinner";
import {colors} from "../../constants/styles";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import {horizontalScale, verticalScale} from "../../utils/metrics";
import Footer from "./components/Footer";


// TODO: Save locations array and/or sectionsPercentages to db for faster loading
const ReadBook = ({book}) => {
    const [src, setSrc] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [isSectionsLoading, setIsSectionsLoading] = useState(false);

    const [sectionsPercentages, setSectionsPercentages] = useState([]);

    const {showModal} = useModal();
    const {
        injectJavascript,
        changeFontSize,
        changeTheme,
        theme,
        changeFontFamily,
        totalLocations,
        goToLocation,
        goNext,
        goPrevious,
        toc,
        section,
        getCurrentLocation
    } = useReader();

    const js = `
    let currentElementsInSection = null;

    function log(data){
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'log', result: data }));
    }

    function error(data){
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', result: data }));
    }

    function getElements(){
        const elements = [];
        rendition.getContents().forEach(function(contents) {
            const paragraphs = contents.document.querySelectorAll("p");
            paragraphs.forEach(function(paragraph) {
                elements.push(paragraph);
            });
        });
        currentElementsInSection = elements;
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'getElements', result: elements.map(element => element.textContent) }));
    }
    
    function sectionChanged() {
        let currentSectionHref = null;
        
        rendition.on("relocated", (location) => {
            const newSectionHref = location.start.href;
            
            if (currentSectionHref !== newSectionHref) {
                // log("Change section. Current section: " + newSectionHref);
                getElements();
                currentSectionHref = newSectionHref;
            }
        })
    }
    
    function calculateCharactersForView(fontSize, fontFamily, containerId = null) {
        let pageWidth, pageHeight;
    
        // Get the dimensions of the container if specified, otherwise use the viewport
        if (containerId) {
            const container = document.getElementById(containerId);
            pageWidth = container.clientWidth;
            pageHeight = container.clientHeight;
        } else {
            pageWidth = window.innerWidth;
            pageHeight = window.innerHeight;
        }
    
        // Create a temporary element to measure character dimensions
        const tempElement = document.createElement('p');
        tempElement.style.position = 'absolute';
        tempElement.style.visibility = 'hidden';
        tempElement.style.fontSize = fontSize + 'px';
        tempElement.style.fontFamily = fontFamily;
        tempElement.textContent = 'A'; // Use a common character for measurement
        document.body.appendChild(tempElement);
    
        // Get character width and line height
        const characterWidth = tempElement.offsetWidth;
        const lineHeight = parseFloat(getComputedStyle(tempElement).lineHeight) || fontSize;
    
        // Remove the temporary element
        document.body.removeChild(tempElement);
    
        // Calculate characters per line and lines per view
        const charactersPerLine = Math.floor(pageWidth / characterWidth);
        const linesPerView = Math.floor(pageHeight / lineHeight);
    
        // Calculate total characters
        const totalCharacters = charactersPerLine * linesPerView;
    
        return {
            charactersPerLine: charactersPerLine,
            linesPerView: linesPerView,
            totalCharacters: totalCharacters
        };
    }
    
    async function getSectionsPercentages(sectionsHrefs) {
        const sectionsPercentages = [];
        for (let href of sectionsHrefs) {
            try {
                let formatedHref = href[0] === "/" ? href.slice(1, href.length) : href;
                await rendition.display(formatedHref);
                sectionsPercentages.push(rendition.currentLocation()?.start?.percentage);
            } catch (e) {
                error("Couldn't fetch sectionsPercentages: " + e);
            }
        }
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'getSectionsPercentages', result: sectionsPercentages }));
    }
    
    function init(){
        let script = document.createElement('script');
        script.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
        document.head.appendChild(script);
    }
    init();
    `

    async function translate(textElementsArray) {
        let trimmedText = textElementsArray.map(element => element.trim());

        if (trimmedText.join("").length < 1) {
            return;
        }

        const textChunks = trimmedText.reduce((chunks, element) => {
            const lastChunk = chunks[chunks.length - 1];
            if (lastChunk && (lastChunk.join("").length + element.length <= 5000)) {
                lastChunk.push(element);
            } else {
                chunks.push([element]);
            }
            return chunks;
        }, []);

        let translatedTextArray = [];

        function translateLoop() {
            const fetchPromises = textChunks.map((textChunk, index) => {
                return new Promise(resolve => {
                    setTimeout(async () => {
                        try {
                            const translatedText = await translateGoogle(textChunk.join("\n"));
                            translatedTextArray.push(...translatedText.split("\n"));
                        } catch (e) {
                            console.error(e);
                        } finally {
                            resolve();
                        }
                    }, 300 * index);
                });
            });
            return Promise.all(fetchPromises);
        }

        await translateLoop();

        for (let i = 0; i < translatedTextArray.length; i++) {
            const js = `
            try {
                function replaceContentByIndex(translatedContent){
                    if (currentElementsInSection[parseInt(${i})]) {
                        // log(currentElementsInSection[parseInt(${i})].textContent);
                        // log(translatedContent);
                        currentElementsInSection[parseInt(${i})].textContent = translatedContent;
                    }
                }
                replaceContentByIndex("${escapeString(translatedTextArray[i])}")
            } catch (e) {
                error(e.toString());
            }`;
            injectJavascript(js)
        }
    }

    async function getSrc(uri) {
        try {
            const fileContent = await tempCopyToCache(uri);
            setSrc(fileContent)
        } catch (e) {
            console.error(e);
            showModal(
                "Error",
                "There is some error occurred. Couldn't load the book. Please try again later."
            )
        }
    }

    function handleReady() {
        changeTheme({
            ...theme,
            "body": {"background": "#F4ECD8"},
            "p": {
                "color": "#5D4037 !important",
                "text-indent": "10% !important",
                "line-height": "1.2 !important",
            }
        })
        changeFontSize('20px')
        injectJavascript(`
            WebFont.load({
              google: {
                families: ['Merriweather']
              },
              context: window.frames[0],
            });
        `)
        changeFontFamily("Merriweather")
    }

    async function handleOnLocationChange(totalLocations, currentLocation, progress, currentSection) {
        // Page number in epubjs is strange thing.
        // Most of the time it is kinda correct, but sometimes there is two pages with same number.

        if (totalLocations !== 0 && !isLoaded && !isSectionsLoading) {
            const sectionsHrefs = toc.reduce((result, section) => {
                result.push(section.href);
                for (let childSection of section.subitems) {
                    result.push(childSection.href);
                }
                return result;
            }, [])

            setIsSectionsLoading(true);
            injectJavascript(`getSectionsPercentages(JSON.parse('${JSON.stringify(sectionsHrefs)}'))`);
            return;
        }

        if (currentLocation.start.location !== 0 && isLoaded && !isSectionsLoading) {
            await book.changeCurrentPage(currentLocation.start.location, currentLocation.start.cfi);
        }
    }

    function handleMessage(message) {
        const {type} = message;
        switch (type) {
            case "getSectionsPercentages": {
                // For some reason, onLocationReady doesn't really go to expected location (Especially if location in near end of section).
                // So to make sure, we go to that location again.
                setSectionsPercentages(message.result);
                if (book.cfiLocation) {
                    goToLocation(book.cfiLocation);
                } else {
                    goToLocation("0")
                }
                setIsLoaded(true);
                setIsSectionsLoading(false);
                break;
            }
            case "changeLocationCfi": {
                goToLocation(message.result);
                break;
            }
            case "getElements": {
                translate(message.result).then(() => {
                });
                break;
            }
            case "log": {
                console.log("Webview log: ", message.result);
                break;
            }
            case "error": {
                console.error("Webview error: ", message.result);
                break;
            }
        }
    }

    useEffect(() => {
        !src && getSrc(book.uri);
    }, []);

    const progressBar = <ProgressBar
        containerStyle={{...(!isOptionsVisible && styles.progressBarWrapper), ...styles.progressBarContainer}}
        sectionsPercentages={sectionsPercentages}
        isDisabled={!isOptionsVisible}
    />;

    return (
        <View style={{flex: 1, backgroundColor: colors.primary200}}>
            {!isLoaded &&
                <View
                    style={styles.spinnerContainer}
                    pointerEvents="none"
                >
                    <LoadingSpinner progressText="Loading book..."/>
                </View>
            }
            {isOptionsVisible && isLoaded && <Header bookTitle={book.title}/>}
            {src &&
                <>
                    <Reader
                        src={src}
                        fileSystem={useFileSystem}
                        onReady={handleReady}
                        onWebViewMessage={(message) => handleMessage(message)}
                        onLocationChange={handleOnLocationChange}
                        onLocationsReady={() => {
                            if (book.cfiLocation) {
                                goToLocation(book.cfiLocation);
                            } else {
                                goNext();
                                goPrevious();
                            }
                        }}
                        onSingleTap={() => setIsOptionsVisible(!isOptionsVisible)}
                        injectedJavascript={js}
                        waitForLocationsReady
                    />
                    {isOptionsVisible ?
                        <Footer progressbarComponent={progressBar}/>
                        :
                        progressBar
                    }
                </>
            }
        </View>
    );
};

const enhance = withObservables(["route"], ({route}) => ({
    book: BookDAO.observeById(route.params?.bookId)
}));

export default enhance(ReadBook);

const styles = StyleSheet.create({
    progressBarWrapper: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0
    },
    progressBarContainer: {
        paddingVertical: verticalScale(5),
        paddingHorizontal: horizontalScale(15),
    },
    spinnerContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: colors.primary200,
        zIndex: 10000
    }
});