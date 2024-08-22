import database from "../database";

const folders = database.collections.get("folders");

export default {
    getFolders: () => folders.query().fetch(),
    observeFolders: () => folders.query().observe(),
    addFolder: async (title, uri, isDefault = false) => {
        await database.write(async () => {
            await folders.create(folder => {
                folder.title = title;
                folder.uri = uri;
                folder.isDefault = isDefault;
            });
        });
    },
};