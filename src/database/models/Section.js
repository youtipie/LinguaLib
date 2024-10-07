import {Model} from '@nozbe/watermelondb'
import {children, relation, text} from "@nozbe/watermelondb/decorators";

export default class Section extends Model {
    static table = "sections";
    static associations = {
        text_elements: {type: "has_many", foreignKey: "section_id"},
        books: {type: "belongs_to", key: "book_id"}
    };

    @text("href") href
    @children("text_elements") textElements
    @relation("books", "book_id") book
}