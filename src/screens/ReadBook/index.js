import React, {useEffect, useRef, useState} from 'react';
import {Reader, useReader} from "@epubjs-react-native/core";
import {Pressable, StyleSheet, View} from "react-native";
import {withObservables} from "@nozbe/watermelondb/react";
import {useFileSystem} from "@epubjs-react-native/expo-file-system";
import {translateText} from "../../services/translate.service";
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
import SectionDAO from "../../database/DAO/SectionDAO";
import TextElementDAO from "../../database/DAO/TextElementDAO";
import {revertSpaces} from "../../database/models/TextElement";
import {useDispatch, useSelector} from "react-redux";
import {
    appSettingsFields,
    selectAllAppSettings,
    selectAllReadingSettings,
    updateAppSetting
} from "../../store/reducers/settings";
import injectedJavascript from "../../constants/injectedJavascript";
import Constants from "expo-constants";
import * as NavigationBar from "expo-navigation-bar";
import {StatusBar} from "expo-status-bar";
import * as KeepAwake from 'expo-keep-awake';
import useVolumeButtons from "../../hooks/useVolumeButtons";

// TODO: Refactor))))))))))))))
// TODO: Bug: Sometimes switching page cause jumping to last page
//  Reopening book cause this as well
// TODO: Think up something with handling presses and swipes
const ReadBook = ({book}) => {
    const [src, setSrc] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [isSectionsLoading, setIsSectionsLoading] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);
    const [isChangePageClicked, setIsChangePageClicked] = useState(false);
    const {applyReadingSettings} = useBookSettings(() => {
        if (isLoaded) {
            setShouldUpdateSettings(true)
        }
    });
    const [shouldUpdateSettings, setShouldUpdateSettings] = useState(false);

    const {translation} = useSelector(selectAllReadingSettings);
    const appSettings = useSelector(selectAllAppSettings);
    const dispatch = useDispatch();

    // We don't want to rerender book when this changes
    const initialLocationsRef = useRef(book.initialLocations);
    const abortionControllerRef = useRef(null);

    const {showModal} = useModal();
    const {
        injectJavascript,
        goToLocation,
        goNext,
        goPrevious,
        toc,
        getCurrentLocation,
        locations,
        theme
    } = useReader();

    if (appSettings.volumeButtons) {
        useVolumeButtons(nextPage, prevPage);
    }

    async function translate(textElementsArray) {
        if (textElementsArray.length < 1) {
            return;
        }

        const textElementChunks = textElementsArray.reduce((chunks, element) => {
            const lastChunk = chunks[chunks.length - 1];
            if (!lastChunk) {
                chunks.push([element]);
                return chunks;
            }
            const lastChunkLen = lastChunk.map((chunk) => revertSpaces(chunk.content)).join("").length;
            const currentElementLen = revertSpaces(element.content).length;
            if (lastChunk && (lastChunkLen + currentElementLen <= 5000)) {
                lastChunk.push(element);
            } else {
                chunks.push([element]);
            }
            return chunks;
        }, []);

        function translateLoop() {
            abortionControllerRef.current = new AbortController();
            const {signal} = abortionControllerRef.current;

            const fetchPromises = textElementChunks.map((textChunk, index) => {
                return new Promise(resolve => {
                    const timeoutId = setTimeout(async () => {
                        if (signal.aborted) {
                            resolve();
                            return;
                        }

                        try {
                            const translatedText = await translateText(textChunk.map(element => revertSpaces(element.content)), appSettings.targetLanguage, appSettings.translatingEngine)
                            for (let i = 0; i < translatedText.length; i++) {
                                const sanitizedContent = await textChunk[i].changeContent(translatedText[i]);
                                injectJavascript(`replaceTextElementByIndex("${escapeString(sanitizedContent)}", ${textChunk[i].index})`);
                            }
                        } catch (e) {
                            console.error(e);
                        } finally {
                            setIsTranslating(false);
                            resolve();
                        }
                    }, 300 * index);

                    signal.addEventListener('abort', () => {
                        clearTimeout(timeoutId);
                        resolve();
                    });
                });
            });
            return Promise.all(fetchPromises);
        }

        setIsTranslating(true);
        await translateLoop();
        goToLocation(book.cfiLocation); // May cause bugs. But not for now
    }

    function cancelTranslationLoop() {
        if (abortionControllerRef.current) {
            abortionControllerRef.current.abort();
            abortionControllerRef.current = null;
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
        if (shouldUpdateSettings) {
            updateSections();
        }
        setShouldUpdateSettings(false);
    }

    function updateSections() {
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
            updateSections();
            return;
        }

        if (currentLocation.start.location !== 0 && isLoaded && !isSectionsLoading) {
            injectJavascript("getCurrentElementIndex()");
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

    function nextPage() {
        goNext();
        handlePageChange("next");
    }

    function prevPage() {
        goPrevious();
        handlePageChange("prev");
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
                const {href, textElements} = message.result;
                const section = await SectionDAO.getSectionByHref(href, book);
                if (!section) {
                    const section = await SectionDAO.addSection(href, book);
                    // Section might consist only of poster image
                    if (textElements.length > 0) {
                        await TextElementDAO.batchAddTextElement(textElements.map((value, index) => ({
                            index: index,
                            content: value
                        })), section);
                    }
                }

                if (isLoaded && !isSectionsLoading && translation) {
                    const section = (await SectionDAO.getSectionByHref(href, book));
                    if (!section) {
                        break;
                    }
                    const textElements = await section.textElements;
                    for (let i = 0; i < textElements.length; i++) {
                        injectJavascript(`replaceTextElementByIndex("${escapeString(revertSpaces(textElements[i].content))}", ${textElements[i].index})`);
                    }
                }
                break;
            }
            case "getCurrentElementIndex": {
                const section = await SectionDAO.getSectionByHref(getCurrentLocation().start.href, book);
                if (!section) {
                    break;
                }
                const currentIndex = message.result;
                const lastTranslatedIndex = await TextElementDAO.getLastTranslatedElementIndex(section);
                let indexToTranslate = currentIndex;
                if (lastTranslatedIndex !== 0) {
                    indexToTranslate = Math.min(currentIndex, lastTranslatedIndex);
                }
                const textElementsToTranslate = await TextElementDAO.getNotTranslatedElements(section, indexToTranslate);
                if (translation && textElementsToTranslate.length > 0) {
                    cancelTranslationLoop();
                    translate(textElementsToTranslate);
                }
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
        dispatch(updateAppSetting({value: book.id, name: appSettingsFields.lastOpenedBook}));
        if (appSettings.screenShutdownDelay) {
            KeepAwake.activateKeepAwakeAsync();
            return () => {
                KeepAwake.deactivateKeepAwake();
            }
        }
    }, []);

    useEffect(() => {
        if (appSettings.fullScreenMode) {
            NavigationBar.setBehaviorAsync('overlay-swipe')
            NavigationBar.setVisibilityAsync("hidden");
        } else {
            NavigationBar.setVisibilityAsync("visible");
        }

        return () => {
            NavigationBar.setVisibilityAsync("visible");
        }
    }, [appSettings])

    const progressBar = <ProgressBar
        containerStyle={{...(!isOptionsVisible && styles.progressBarWrapper), ...styles.progressBarContainer}}
        sectionsPercentages={book.sectionsPercentages}
        totalPages={book.totalPages}
        progress={book.progress}
        onPageChange={(page, percentage) => book.changeCurrentPage(page, percentage)}
        isDisabled={!isOptionsVisible}
    />;

    return (
        <View style={{flex: 1, backgroundColor: theme.body.background, paddingTop: Constants.statusBarHeight}}>
            {appSettings.fullScreenMode && <StatusBar hidden={true} translucent/>}
            {(!isLoaded || isSectionsLoading) &&
                <View
                    style={styles.spinnerContainer}
                    pointerEvents="auto"
                >
                    <LoadingSpinner progressText="Loading book..."/>
                </View>
            }
            {isTranslating &&
                <View
                    style={{
                        ...styles.spinnerContainer,
                        backgroundColor: styles.spinnerContainer.backgroundColor + "85"
                    }}
                    pointerEvents="auto"
                >
                    <LoadingSpinner progressText="Translating..."/>
                </View>}
            {isOptionsVisible && isLoaded &&
                <Header bookTitle={book.title} onSettingsClose={handleChangeBookSettings}/>
            }
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
                        onSingleTap={() => {
                            if (!isChangePageClicked) {
                                setIsOptionsVisible(!isOptionsVisible);
                            }
                            setIsChangePageClicked(false);
                        }}
                        onSwipeLeft={() => handlePageChange("next")}
                        onSwipeRight={() => handlePageChange("prev")}
                        injectedJavascript={injectedJavascript}
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
            <View
                pointerEvents="auto"
                style={styles.clickCatcher}
            ></View>
            <Pressable onPress={() => {
                setIsChangePageClicked(true);
                prevPage();
            }} style={styles.leftButton}/>
            <Pressable onPress={() => {
                setIsChangePageClicked(true);
                nextPage();
            }} style={styles.rightButton}/>
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
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.primary200,
        zIndex: 10000
    },
    clickCatcher: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "transparent",
        zIndex: 10000
    },
    leftButton: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: "15%",
        zIndex: 10001
    },
    rightButton: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: "15%",
        zIndex: 10001
    }
});