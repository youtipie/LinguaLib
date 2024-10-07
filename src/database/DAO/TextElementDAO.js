import database from "../database";
import {Q} from "@nozbe/watermelondb";

const textElements = database.collections.get("text_elements");

export default {
    // addTextElement: async (content, section) => {
    //     await database.write(async () => {
    //         await textElements.create(textElement => {
    //             textElement.content = content;
    //             textElement.section.set(section);
    //         });
    //     });
    // },
    getTextElementByIndex: (index, section) => textElements.query(Q.and(Q.where("index", index), Q.where("section_id", section.id))).fetch(),
    batchAddTextElement: async (contentsData, section) => {
        await database.write(async () => {
            const newTextElements = contentsData.map(contentData =>
                textElements.prepareCreate(textElement => {
                    textElement.content = contentData.content;
                    textElement.index = contentData.index;
                    textElement.section.set(section);
                })
            )
            await database.batch(newTextElements);
        });
    },
};