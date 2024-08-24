import {createContext, useEffect, useState} from "react";
import {View} from "react-native";
import {Reader, useReader} from "@epubjs-react-native/core";
import {useFileSystem} from "@epubjs-react-native/expo-file-system";
import tempCopyToCache from "../utils/tempCopyToCache";
import LoadingSpinner from "../UI/LoadingSpinner";
import getFilename from "../utils/getFilename";
import {delay} from "@reduxjs/toolkit/src/utils";

export const MetadataContext = createContext([]);

// TODO: Add exception handling if book is corrupted or etc
const MetadataProvider = ({children}) => {
    const [currentBook, setCurrentBook] = useState(null);
    const [spinner, setSpinner] = useState(null);

    function reset() {
        setCurrentBook(null);
        setSpinner(null);
    }

    async function extractMetadataFromUriList(uriList) {
        reset();

        let metadataList = [];
        let shouldStop = false;

        for (let i = 0; i < uriList.length; i++) {
            if (shouldStop) {
                reset();
                return [];
            }

            try {
                const meta = await new Promise(async (resolve) => {
                    // TODO: Make exit immediate
                    setSpinner(
                        <LoadingSpinner
                            progressText={`${i + 1}/${uriList.length}`}
                            label={`Loading file: ${getFilename(uriList[i])}`}
                            onDiscard={() => {
                                shouldStop = true;
                                resolve(null);
                            }}
                        />
                    );

                    const fileContent = await tempCopyToCache(uriList[i]);
                    setCurrentBook(<MetadataHelper src={fileContent} onReady={resolve}/>);
                });

                metadataList.push({...meta, uri: uriList[i]});
                setCurrentBook(null);
            } catch (e) {
                console.log(e);
                reset();
                return [];
            }
        }

        reset();
        return metadataList;
    }

    return (
        <MetadataContext.Provider value={{extractMetadataFromUriList}}>
            {children}
            {currentBook !== null && currentBook}
            {spinner}
        </MetadataContext.Provider>
    );
};

// Extraction is very long, due to having to wait for locations.
const MetadataHelper = ({src, onReady}) => {
    const {getMeta, goNext} = useReader();

    return (
        <View style={{position: "absolute", opacity: 0}}>
            {/* Won't render if height and width is not set */}
            <Reader
                src={src}
                height={1}
                width={1}
                onLocationsReady={(e, locations) => {
                    // Triggering onLocationChange, because we cannot get totalLocations from onLocationReady
                    // (It is always 0)
                    goNext()
                }}
                onLocationChange={(totalLocations, current, progress) => {
                    if (totalLocations) {
                        onReady({...getMeta(), totalPages: totalLocations});
                    }
                }}
                fileSystem={useFileSystem}
                waitForLocationsReady
            />
        </View>
    );
};
export default MetadataProvider;