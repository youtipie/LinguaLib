function getFilename(uri) {
    const decodedUri = decodeURIComponent(uri);
    const splitUri = decodedUri.split('/');
    return splitUri[splitUri.length - 1];
}

export default getFilename;