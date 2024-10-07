import {Model} from '@nozbe/watermelondb'
import {field, relation, text, writer} from "@nozbe/watermelondb/decorators";

export default class TextElement extends Model {
    static table = "text_elements";
    static associations = {
        sections: {type: "belongs_to", key: "section_id"},
    }

    @text("content") content
    @field("is_translated") isTranslated
    @field("index") index
    @relation("sections", "section_id") section

    @writer
    async changeContent(content) {
        await this.update(textElement => {
            textElement.content = content;
            textElement.isTranslated = true;
        })
    }

    @writer
    async delete() {
        await this.destroyPermanently();
    }
}