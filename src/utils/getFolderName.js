const getFolderName = (uri) => {
    const decodedUri = decodeURIComponent(uri);
    return "/" + decodedUri.split("tree/primary:")[1];
};

export default getFolderName;