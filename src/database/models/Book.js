import {Model} from '@nozbe/watermelondb'
import {date, relation, text} from "@nozbe/watermelondb/decorators";

export default class Book extends Model {
    static table = "books"
    static associations = {
        folders: {type: "belongs_to", key: "folder_id"},
    }

    @text("name") name
    @relation("folders", "folder_id") book
    @date("last_interaction_at") lastInteractionAt
}