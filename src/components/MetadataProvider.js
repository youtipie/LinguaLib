import {createContext, useEffect, useState} from "react";
import {View} from "react-native";
import {Reader, useReader} from "@epubjs-react-native/core";
import {useFileSystem} from "@epubjs-react-native/expo-file-system";
import tempCopyToCache from "../utils/tempCopyToCache";

export const MetadataContext = createContext([]);

// TODO: Optimize this sh. Probably make processing in batches
const MetadataProvider = ({children}) => {
    const {getMeta} = useReader();
    const [uriList, setUriList] = useState([]);
    const [metadataList, setMetadataList] = useState([]);
    const [currentSrc, setCurrentSrc] = useState(null);
    const [currentUriIndex, setCurrentUriIndex] = useState(null);
    const [onDone, setOnDone] = useState(null);

    function onReadyHandler() {
        const metadata = getMeta();
        setMetadataList(prevState => [...prevState, metadata]);
        setCurrentSrc(null);
        setCurrentUriIndex(prev => prev + 1);
    }

    function extractMetadataFromUriList(uriList, onDone) {
        setUriList(uriList);
        setOnDone(() => onDone);
        setMetadataList([]);
    }

    useEffect(() => {
        if (uriList.length > 0) {
            setCurrentUriIndex(0);
        }
    }, [uriList]);

    useEffect(() => {
        (async function processCurrentUri() {
            if (currentUriIndex !== null && currentUriIndex < uriList.length) {
                const bookContent = await tempCopyToCache(uriList[currentUriIndex]);
                setCurrentSrc(bookContent);
            }
        })();
    }, [currentUriIndex]);

    useEffect(() => {
        if ((metadataList.length > 0 && uriList.length > 0) && (metadataList.length === uriList.length) && onDone) {
            onDone(metadataList);
        }
    }, [metadataList, uriList]);

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
        </MetadataContext.Provider>
    );
};

export default MetadataProvider;