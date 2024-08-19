import {useContext} from "react";
import {MetadataContext} from "../components/MetadataProvider";

const UseGetMetadataFromUriList = () => {
    const {extractMetadataFromUriList} = useContext(MetadataContext);

    async function extractMetadataFromUriListWrapper(uriList) {
        return new Promise(resolve => {
            extractMetadataFromUriList(uriList, (metadataList) => {
                resolve(metadataList);
            });
        });
    }

    return {extractMetadataFromUriList: extractMetadataFromUriListWrapper};
};

export default UseGetMetadataFromUriList;