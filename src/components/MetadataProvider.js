import {createContext, useEffect, useState} from "react";
import {Alert, View} from "react-native";
import {Reader, useReader} from "@epubjs-react-native/core";
import {useFileSystem} from "@epubjs-react-native/expo-file-system";
import tempCopyToCache from "../utils/tempCopyToCache";
import LoadingSpinner from "../UI/LoadingSpinner";
import getFilename from "../utils/getFilename";

export const MetadataContext = createContext([]);

// TODO: Optimize this sh. Cannot use batches. Seems like books cannot be rendered in batch.
const MetadataProvider = ({children}) => {
    const {getMeta, isRendering, isLoading} = useReader();

    const [currentSrc, setCurrentSrc] = useState(null);
    const [currentOnReady, setCurrentOnReady] = useState(null);
    const [spinner, setSpinner] = useState(null);
    const [shouldStop, setShouldStop] = useState(false);

    function reset() {
        setCurrentSrc(null);
        setCurrentOnReady(null);
        setSpinner(null);
        setShouldStop(false);
    }

    async function extractMetadataFromUriList(uriList) {
        reset();
        let metadataList = [];

        for (let i = 0; i < uriList.length; i++) {
            console.log(i);
            if (shouldStop) {
                reset();
                return [];
            }

            const fileContent = await tempCopyToCache(uriList[i]);
            await new Promise((resolve) => {
                setCurrentSrc(() => {
                    console.log(fileContent.slice(1, 50) + " " + i)
                    return fileContent
                });

                setCurrentOnReady(() =>
                    (meta) => {
                        metadataList.push(meta);
                        console.log("Got meta " + meta.title);
                        resolve();
                    }
                );
                setSpinner(
                    <LoadingSpinner
                        progressText={`${i + 1}/${uriList.length}`}
                        label={`Loading file: ${getFilename(uriList[i])}`}
                        onDiscard={() => setShouldStop(true)}
                    />
                );
            })
        }
        reset();
        return metadataList;
    }

    useEffect(() => {
        if (!isRendering && currentOnReady) {
            currentOnReady(getMeta());
        }
    }, [isRendering]);
    return (
        <MetadataContext.Provider value={{extractMetadataFromUriList}}>
            {children}
            {currentSrc &&
                <View style={{position: "absolute", opacity: 1}}>
                    {/* Won't render if height and width is not set */}
                    <Reader
                        src={currentSrc}
                        height={500}
                        width={500}
                        fileSystem={useFileSystem}
                    />
                </View>}
            {spinner}
        </MetadataContext.Provider>
    );
};

export default MetadataProvider;