import database from "../database";
import {replaceSpaces} from "../models/TextElement";

const textElements = database.collections.get("text_elements");

export default {
    getLastTranslatedElementIndex: async (section) => {
        const textElements = await section.textElements;
        return textElements
            .filter(element => element.isTranslated)
            .reduce((max, element) => Math.max(max, element.index), 0);
    },
    getNotTranslatedElements: async (section, startingIndex = 0) => {
        const textElements = await section.textElements;
        return textElements.filter(element => !element.isTranslated && element.index >= startingIndex);
    },
    batchAddTextElement: async (contentsData, section) => {
        await database.write(async () => {
            const newTextElements = contentsData.map(contentData =>
                textElements.prepareCreate(textElement => {
                    textElement.content = replaceSpaces(contentData.content);
                    textElement.index = contentData.index;
                    textElement.section.set(section);
                })
            )
            await database.batch(newTextElements);
        });
    },
};