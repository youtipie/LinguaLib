import {cacheDirectory, copyAsync, deleteAsync, readAsStringAsync} from "expo-file-system";

async function tempCopyToCache(uri) {
    const tempUri = cacheDirectory + "temp_book";
    await copyAsync({from: uri, to: tempUri});

    const result = await readAsStringAsync(tempUri, {
        encoding: "base64",
    });

    await deleteAsync(tempUri);

    return result;
}

export default tempCopyToCache;