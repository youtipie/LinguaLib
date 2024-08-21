import {createContext, useEffect, useState} from "react";
import {View} from "react-native";
import {Reader, useReader} from "@epubjs-react-native/core";
import {useFileSystem} from "@epubjs-react-native/expo-file-system";
import tempCopyToCache from "../utils/tempCopyToCache";
import LoadingSpinner from "../UI/LoadingSpinner";
import getFilename from "../utils/getFilename";
import {BookDAO} from "../database";

export const MetadataContext = createContext([]);

// TODO: Optimize this sh. Cannot use batches. Seems like books cannot be rendered in batch.
const MetadataProvider = ({children}) => {
    const {getMeta} = useReader();
    const [uriList, setUriList] = useState([]);
    const [existingUriList, setExistingUriList] = useState([]);
    const [metadataList, setMetadataList] = useState([]);
    const [currentSrc, setCurrentSrc] = useState(null);
    const [currentUriIndex, setCurrentUriIndex] = useState(null);
    const [isDone, setIsDone] = useState(true);
    const [onDone, setOnDone] = useState(null);

    function extractMetadataFromUriList(uriList, onDone) {
        (async () => {
            const existingBooks = await BookDAO.queryAllBooks().fetch();
            const existingUris = existingBooks.map(book => book.uri);
            setExistingUriList(existingUris);
            setUriList(uriList);
            setIsDone(false);
            setOnDone(() => onDone);
        })();
    }

    function onReadyHandler() {
        const metadata = getMeta();
        setMetadataList(prevState => [...prevState, {...metadata, uri: uriList[currentUriIndex]}]);
        setCurrentSrc(null);
        setCurrentUriIndex(prev => prev + 1);
    }

    function handleDone(returnValue) {
        setIsDone(true);
        setCurrentSrc(null);
        setCurrentUriIndex(null);
        setMetadataList([]);
        setUriList([]);
        setExistingUriList([]);
        onDone(returnValue);
        setOnDone(null);
    }

    function discard() {
        handleDone([]);
    }

    useEffect(() => {
        if (uriList.length > 0) {
            setCurrentUriIndex(0);
        }
    }, [uriList]);

    useEffect(() => {

        (async function processCurrentUri() {
            if (currentUriIndex >= uriList.length && uriList.length > 0) {
                handleDone(metadataList);
                return
            }

            if (currentUriIndex !== null && currentUriIndex < uriList.length) {
                if (existingUriList.includes(uriList[currentUriIndex])) {
                    setCurrentUriIndex(prev => prev + 1);
                } else {
                    const bookContent = await tempCopyToCache(uriList[currentUriIndex]);
                    setCurrentSrc(bookContent);
                }
            }
        })();
    }, [currentUriIndex]);

    return (
        <MetadataContext.Provider value={{extractMetadataFromUriList}}>
            {children}
            {
                currentSrc &&
                <View style={{position: "absolute", opacity: 0}}>
                    {/* Won't render if height and width is not set */}
                    <Reader
                        src={currentSrc}
                        height={1}
                        width={1}
                        fileSystem={useFileSystem}
                        onReady={onReadyHandler}
                    />
                </View>
            }
            {
                !isDone && uriList &&
                <LoadingSpinner
                    progressText={`${currentUriIndex + 1}/${uriList.length}`}
                    label={`Loading file: ${getFilename(uriList[currentUriIndex])}`}
                    onDiscard={discard}
                />
            }
        </MetadataContext.Provider>
    );
};

export default MetadataProvider;