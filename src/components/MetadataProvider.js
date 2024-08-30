import {createContext, useState} from "react";
import {View} from "react-native";
import {Reader, useReader} from "@epubjs-react-native/core";
import {useFileSystem} from "@epubjs-react-native/expo-file-system";
import tempCopyToCache from "../utils/tempCopyToCache";
import LoadingSpinner from "../UI/LoadingSpinner";
import getFilename from "../utils/getFilename";

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

const MetadataHelper = ({src, onReady}) => {
    const {getMeta} = useReader();

    return (
        <View style={{position: "absolute", opacity: 0}}>
            {/* Won't render if height and width is not set */}
            <Reader
                src={src}
                height={1}
                width={1}
                onReady={() => onReady(getMeta())}
                fileSystem={useFileSystem}
            />
        </View>
    );
};
export default MetadataProvider;