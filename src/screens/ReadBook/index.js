import React, {useEffect, useState} from 'react';
import {Reader, useReader} from "@epubjs-react-native/core";
import * as DocumentPicker from "expo-document-picker";
import {cacheDirectory, copyAsync, deleteAsync, readAsStringAsync} from "expo-file-system";
import {Pressable, SafeAreaView, Text, View} from "react-native";
import {useFileSystem} from "@epubjs-react-native/expo-file-system";
import {translateGoogle} from "../../services/translate.service";
import escapeString from "../../utils/escapeString";

const ReadBook = () => {
    const [src, setSrc] = useState('');
    const {injectJavascript, getMeta} = useReader();
    useEffect(() => {
        console.log(getMeta())
    }, [getMeta]);

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
    sectionChanged();
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

    async function tempCopyToCache(uri, action) {
        const tempUri = cacheDirectory + 'temp_book';
        await copyAsync({from: uri, to: tempUri});

        const result = await readAsStringAsync(tempUri, {
            encoding: "base64",
        });

        action(result);

        await deleteAsync(tempUri);

    }

    async function getSrc() {
        try {
            const book = await DocumentPicker.getDocumentAsync({
                // Setting to false cause error on dev build. Might consider writing other mechanism to get file uri
                copyToCacheDirectory: false,
                type: "application/epub+zip"
            });
            const uri = book.assets[0].uri;

            await tempCopyToCache(uri, (fileContent) => setSrc(fileContent));
        } catch (e) {
            console.error(e);
        }
    }

    function handleMessage(message) {
        const {type} = message;
        switch (type) {
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

    !src && getSrc();

    return (
        <SafeAreaView style={{flex: 1}}>
            {src &&
                <Reader
                    src={src}
                    fileSystem={useFileSystem}
                    onWebViewMessage={(message) => handleMessage(message)}
                    injectedJavascript={js}
                />
            }
        </SafeAreaView>
    );
};

export default ReadBook;