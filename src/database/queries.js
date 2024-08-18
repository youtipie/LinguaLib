import database from "./index";

export async function addFolder(title, uri, isDefault = false) {
    await database.write(async () => {
        const folderCollection = database.get('folders');
        await folderCollection.create(folder => {
            folder.title = title;
            folder.uri = uri;
            folder.isDefault = isDefault;
        });
    });
}
