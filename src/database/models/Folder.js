import {Model} from '@nozbe/watermelondb'
import {children, field, text, writer} from "@nozbe/watermelondb/decorators";
import getFolderName from "../../utils/getFolderName";

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
        return getFolderName(this.uri)
    }

    @writer
    async changeTitle(title) {
        await this.update(folder => {
            folder.title = title
        })
    }

    @writer
    async delete() {
        await this.destroyPermanently();
    }
}