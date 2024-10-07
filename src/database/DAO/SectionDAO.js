import database from "../database";
import {Q} from "@nozbe/watermelondb";

const sections = database.collections.get("sections");

const querySectionByHref = (href, book) => sections.query(Q.and(Q.where("href", href), Q.where("book_id", book.id)));

export default {
    getSectionByHref: (href, book) => querySectionByHref(href, book).fetch(),
    getSectionByHrefCount: (href, book) => querySectionByHref(href, book).fetchCount(),
    addSection: async (href, book) => {
        let newSection;
        await database.write(async () => {
            newSection = await sections.create(section => {
                section.href = href;
                section.book.set(book);
            });
        });
        return newSection;
    },
};