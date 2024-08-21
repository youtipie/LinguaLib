import {Model} from '@nozbe/watermelondb'
import {date, field, relation, text} from "@nozbe/watermelondb/decorators";

export default class Book extends Model {
    static table = "books"
    static associations = {
        folders: {type: "belongs_to", key: "folder_id"},
    }

    @text("title") title
    @text("cover") cover
    @text("author") author
    @text("uri") uri
    @text("annotation") annotation
    @text("language") language
    @field("progress") progress
    @field("is_finished") isFinished
    @relation("folders", "folder_id") book
    @date("last_interaction_at") lastInteractionAt
}