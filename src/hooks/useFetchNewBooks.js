import {StorageAccessFramework} from "expo-file-system";
import {BookDAO, FolderDAO} from "../database";
import UseGetMetadataFromUriList from "./UseGetMetadataFromUriList";

const UseFetchNewBooks = () => {
    const {extractMetadataFromUriList} = UseGetMetadataFromUriList();

    async function fetchNewBooks() {
        try {
            const folders = await FolderDAO.getFolders();
            const existingBooks = await BookDAO.queryAllBooks().fetch();
            const existingUris = existingBooks.map(book => book.uri);

            for (let folder of folders) {
                const uriList = (await StorageAccessFramework.readDirectoryAsync(folder.uri)).filter(element => element.endsWith(".epub"));
                const excludedUriList = uriList.filter(uri => !existingUris.includes(uri));
                const books = await extractMetadataFromUriList(excludedUriList);
                await BookDAO.batchAddBooks(books);
            }

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    return fetchNewBooks;
};

export default UseFetchNewBooks;