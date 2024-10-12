import {Model} from '@nozbe/watermelondb'
import {field, relation, text, writer} from "@nozbe/watermelondb/decorators";

// Have to use this workaround because for some reason watermelon db keeps trimming whitespaces
export const replaceSpaces = (str) => {
    let updatedStr = str.replace(/^ +/, match => '_SP_'.repeat(match.length));
    updatedStr = updatedStr.replace(/ +$/, match => '_SP_'.repeat(match.length));
    return updatedStr;
};
export const revertSpaces = (str) => str.replace(/_SP_/g, ' ');

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
        let updatedContent = content;
        if (content) {
            await this.update(textElement => {
                const oldContent = revertSpaces(textElement.content);
                const hasLeadingSpace = oldContent.startsWith(" ");
                const hasTrailingSpace = oldContent.endsWith(" ");

                // Add leading and trailing spaces to the new content
                if (hasLeadingSpace) {
                    updatedContent = " " + updatedContent;
                }
                if (hasTrailingSpace) {
                    updatedContent += " ";
                }

                textElement.content = replaceSpaces(updatedContent);
                textElement.isTranslated = true;
            })
        }
        return updatedContent;
    }

    @writer
    async delete() {
        await this.destroyPermanently();
    }
}