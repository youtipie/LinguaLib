import database from "../database";
import {Q} from "@nozbe/watermelondb";

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
    querySearchReadingNowBooks: (searchValue) => queryBooks(false, searchValue),
    querySearchFinishedBooks: (searchValue) => queryBooks(true, searchValue),
    batchAddBooks: async (booksData) => {
        await database.write(async () => {
            const newBooks = booksData.map(bookData =>
                books.prepareCreate(book => {
                    book.cover = bookData.cover;
                    book.author = bookData.author;
                    book.title = bookData.title;
                    book.uri = bookData.uri;
                    book.annotation = bookData.annotation;
                    book.language = bookData.language;
                    book.progress = 0;
                    book.isFinished = false;
                })
            )
            await database.batch(newBooks);
        });
    },
};