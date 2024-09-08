import React, {useEffect, useRef, useState} from 'react';
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
import useBookSettings from "../../hooks/useBookSettings";


const ReadBook = ({book}) => {
    const [src, setSrc] = useState('');
    const {applyReadingSettings} = useBookSettings();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [isSectionsLoading, setIsSectionsLoading] = useState(false);

    // We don't want to rerender book when this changes
    const initialLocationsRef = useRef(book.initialLocations);

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
        getCurrentLocation,
        locations
    } = useReader();

    const js = `
    let currentElementsInSection = null;

    function log(data){
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'log', result: data }));
    }

    function error(data){
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', result: data }));
    }
    
    function getTextNodes(element) {
        const nodes = [];
        for (let node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 1) {
                nodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                nodes.push(...getTextNodes(node));
            }
        }
        return nodes;
    }
    
    async function findIndexOfCurrentTextElement() {
        let index = -1;
        const range = makeRangeCfi(rendition.currentLocation().start.cfi, rendition.currentLocation().end.cfi);
        await book.getRange(range).then(r => {
            const content = r.toString().replace(/\\n+/g, "\\n").split("\\n")
                .filter(element => element.trim().length > 1)
                .map(element => element.trim());
            index = getElementsInSection().findIndex(element => element.textContent.includes(content[0]));
        });
        return index;
    }
    
    function getElementsInSection() {
        const elements = [];
        rendition.getContents().forEach(function(contents) {
            // const textWrapperElement = contents.document.querySelectorAll("body > *");
            // const textElements = textWrapperElement.length === 1 ?  textWrapperElement[0].children : textWrapperElement;
            //
            // for (let i = 0; i < textElements.length; i++) {
            //     const element = textElements[i];
            //     if (element.textContent.trim()) {
            //         elements.push(element);
            //     }
            // };
            elements.push(...getTextNodes(contents.document.body));
        });
        currentElementsInSection = elements;
        return elements;
        // window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'getElementsInSection', result: elements.map(element => element.textContent) }));
    }
    
    function sectionChanged() {
        let currentSectionHref = null;
        
        rendition.on("relocated", (location) => {
            const newSectionHref = location.start.href;
            
            if (currentSectionHref !== newSectionHref) {
                // log("Change section. Current section: " + newSectionHref);
                getElementsInSection();
                currentSectionHref = newSectionHref;
            }
        })
    }
    
    // Does not work as intended. Leave it here for now.
    function resetLocations() {
        let pageWidth, pageHeight;

        const container = window.frames[0].document.body;
        pageWidth = container.clientWidth;
        pageHeight = container.clientHeight;
        
        const tempElement = window.frames[0].document.createElement('p');
        tempElement.style.position = 'absolute';
        tempElement.style.visibility = 'hidden';
        tempElement.textContent = 'A'; // Use a common character for measurement
        window.frames[0].document.body.appendChild(tempElement);
    
        const characterWidth = tempElement.offsetWidth;
        const lineHeight = parseFloat(getComputedStyle(tempElement).lineHeight) || fontSize;
    
        window.frames[0].document.body.removeChild(tempElement);
    
        const charactersPerLine = Math.floor(pageWidth / characterWidth);
        const linesPerView = Math.floor(pageHeight / lineHeight);
    
        const totalCharacters = charactersPerLine * linesPerView;
        
        book.locations.generate(totalCharacters).then(locations => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'resetLocations', result: locations }));
        });
    }
    
    async function updateSections(sections) {
        const sectionsHrefs = sections.reduce((result, section) => {
            result.push(section.href);
            for (let childSection of section.subitems) {
                result.push(childSection.href);
            }
            return result;
        }, [])

        let sectionsPercentages = [];
        let totalPages = 0;

        for (let href of sectionsHrefs) {
            try {
                let formatedHref = href[0] === "/" ? href.slice(1, href.length) : href;
                await rendition.display(formatedHref);
                const currentLocation = rendition.currentLocation();
                totalPages += currentLocation?.start.displayed.total;
                sectionsPercentages.push(currentLocation?.start?.percentage);
            } catch (e) {
                error("Couldn't fetch sectionsPercentages: " + e);
            }
        }
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: "updateSections", result: {sectionsPercentages, totalPages, isLoading: false} }));
    }
    
    function loadWebFont(){
        let script = document.createElement('script');
        script.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
        document.head.appendChild(script);
        sectionChanged();
    }
    loadWebFont();
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
        applyReadingSettings();
    }

    function handleChangeBookSettings() {
        setIsSectionsLoading(true);
        injectJavascript(`updateSections(JSON.parse('${JSON.stringify(toc).replace(/\\n|\\t/g, "")}'));`)
    }

    async function handleOnLocationChange(totalLocations, currentLocation, progress, currentSection) {
        // Page number in epubjs is strange thing.
        // Most of the time it is kinda correct, but sometimes there is two pages with same number.
        if (totalLocations !== 0 && !isLoaded && !isSectionsLoading) {
            if (initialLocationsRef.current.length && book.sectionsPercentages.length) {
                finishLoading();
                return;
            }
            if (!initialLocationsRef.current.length) {
                await book.changeInitialLocations(locations);
            }
            handleChangeBookSettings();
            return;
        }

        if (currentLocation.start.location !== 0 && isLoaded && !isSectionsLoading) {
            await book.changeCfiLocation(currentLocation.start.cfi);
        }
    }

    async function handlePageChange(dir) {
        let page = book.page;

        if (dir === "prev") {
            if (book.page === 0) return;
            page = book.page - 1;
        }
        if (dir === "next") {
            if (book.page === book.totalPages) return;
            page = book.page + 1;
        }

        await book.changeCurrentPage(page, page / book.totalPages);
    }

    function finishLoading() {
        // For some reason, onLocationReady doesn't really go to expected location (Especially if location in near end of section).
        // So to make sure, we go to that location again.
        if (book.cfiLocation) {
            goToLocation(book.cfiLocation);
        } else {
            goToLocation("0")
        }
        setIsLoaded(true);
        setIsSectionsLoading(false);
    }

    async function handleMessage(message) {
        const {type} = message;
        switch (type) {
            case "changeLocationCfi": {
                goToLocation(message.result);
                break;
            }
            case "updateSections":
                if (message.result.isLoading) {
                    setIsLoaded(false);
                    setIsOptionsVisible(false);
                    setIsSectionsLoading(false);
                    break;
                }
                finishLoading();
                const {sectionsPercentages, totalPages} = message.result;
                await book.changeSectionsPercentages(sectionsPercentages);
                const page = (book.page * totalPages) / book.totalPages;
                await book.changeCurrentPage(page, page / totalPages);
                await book.changeTotalPages(totalPages);
                break;
            case "getElementsInSection": {
                // translate(message.result).then(() => {
                // });
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
        sectionsPercentages={book.sectionsPercentages}
        totalPages={book.totalPages}
        progress={book.progress}
        onPageChange={(page, percentage) => book.changeCurrentPage(page, percentage)}
        isDisabled={!isOptionsVisible}
    />;

    return (
        <View style={{flex: 1, backgroundColor: colors.primary200}}>
            {(!isLoaded || isSectionsLoading) &&
                <View
                    style={styles.spinnerContainer}
                    pointerEvents="none"
                >
                    <LoadingSpinner progressText="Loading book..."/>
                </View>
            }
            {isOptionsVisible && isLoaded &&
                <Header bookTitle={book.title} onSettingsClose={handleChangeBookSettings}/>}
            {src &&
                <>
                    <Reader
                        src={src}
                        initialLocations={initialLocationsRef.current.length ? initialLocationsRef.current : null}
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
                        onSwipeLeft={() => handlePageChange("next")}
                        onSwipeRight={() => handlePageChange("prev")}
                        injectedJavascript={js}
                        waitForLocationsReady={!initialLocationsRef.current.length}
                    />
                    {isOptionsVisible ?
                        <Footer progressbarComponent={progressBar} totalPages={book.totalPages}
                                currentPage={book.page}/>
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