import database from "../database";
import {Q} from "@nozbe/watermelondb";
import escapeTags from "../../utils/escapeTags";
import {getLanguageByCode} from "../../utils/languageManager";

const books = database.collections.get("books");

const queryBooks = (isFinished, searchValue = "") => {
    const baseQuery = books.query(Q.where("is_finished", isFinished));

    if (searchValue) {
        return baseQuery.extend(Q.where("title", Q.like(`%${Q.sanitizeLikeString(searchValue)}%`)));
    }

    return baseQuery;
};

export default {
    queryAllBooks: () => books.query(),
    queryReadingNowBooks: () => queryBooks(false),
    queryFinishedBooks: () => queryBooks(true),
    observeById: (id) => books.findAndObserve(id),
    querySearchReadingNowBooks: (searchValue) => queryBooks(false, searchValue),
    querySearchFinishedBooks: (searchValue) => queryBooks(true, searchValue),
    isExist: async (id) => {
        try {
            return await books.find(id);
        } catch (err) {
            return false;
        }
    },
    batchAddBooks: async (booksData, folder) => {
        await database.write(async () => {
            const newBooks = booksData.map(bookData =>
                books.prepareCreate(book => {
                    book.cover = bookData.cover;
                    book.author = bookData.author;
                    book.title = bookData.title;
                    book.uri = bookData.uri;
                    book.description = escapeTags(bookData.description);
                    book.language = getLanguageByCode(bookData.language);
                    book.progress = 0;
                    book.totalPages = 0;
                    book.page = 0;
                    book.timeSpent = 0;
                    book.initialLocations = [];
                    book.sectionsPercentages = [];
                    book.isFinished = false;
                    book.folder.set(folder);
                })
            )
            await database.batch(newBooks);
        });
    },
};