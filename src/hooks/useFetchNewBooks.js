import useGetMetadataFromDirectory from "./UseGetMetadataFromDirectory";
import {BookDAO, database, FolderDAO} from "../database";

const UseFetchNewBooks = () => {
    const {getMetadataFromDirectory} = useGetMetadataFromDirectory();

    async function fetchNewBooks() {
        try {
            const folders = await FolderDAO.getFolders();
            for (let folder of folders) {
                const books = await getMetadataFromDirectory(folder.uri);
                await BookDAO.batchAddBooks(books.map(book => ({...book, annotation: book.description})));
                console.log("Fetched: " + books.length);
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