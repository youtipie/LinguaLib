import {Model} from '@nozbe/watermelondb'
import {children, field, text, writer} from "@nozbe/watermelondb/decorators";
import getAbsolutePath from "../../utils/getAbsolutePath";

export default class Folder extends Model {
    static table = "folders"
    static associations = {
        books: {type: "has_many", foreignKey: "folder_id"},
    }

    @text("title") title
    @text("uri") uri
    @field("is_default") isDefault
    @children("books") books

    get path() {
        return getAbsolutePath(this.uri)
    }

    @writer
    async changeTitle(title) {
        await this.update(folder => {
            folder.title = title
        })
    }

    @writer
    async delete(force = false) {
        if ((await this.books.fetch()).length > 0 && !force) {
            return false;
        }
        await this.books.destroyAllPermanently();
        await this.destroyPermanently();
        return true;
    }
}