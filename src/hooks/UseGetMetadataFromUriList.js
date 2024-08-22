import {useContext} from "react";
import {MetadataContext} from "../components/MetadataProvider";

const UseGetMetadataFromUriList = () => {
    const {extractMetadataFromUriList} = useContext(MetadataContext);

    return {extractMetadataFromUriList};
};

export default UseGetMetadataFromUriList;