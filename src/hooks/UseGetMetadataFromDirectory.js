import {useContext} from "react";
import {MetadataContext} from "../components/MetadataProvider";
import {StorageAccessFramework} from "expo-file-system";

const UseGetMetadataFromDirectory = () => {
    const {extractMetadataFromUriList} = useContext(MetadataContext);

    async function getMetadataFromDirectoryWrapper(directoryUri) {
        const uriList = (await StorageAccessFramework.readDirectoryAsync(directoryUri)).filter(element => element.endsWith(".epub"));
        return new Promise(resolve => {
            extractMetadataFromUriList(uriList, (metadataList) => {
                resolve(metadataList);
            });
        });
    }

    return {getMetadataFromDirectory: getMetadataFromDirectoryWrapper};
};

export default UseGetMetadataFromDirectory;