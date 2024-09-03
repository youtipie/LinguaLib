import {Model} from '@nozbe/watermelondb'
import {date, field, json, relation, text, writer} from "@nozbe/watermelondb/decorators";
import {StorageAccessFramework} from "expo-file-system"
import getFilename from "../../utils/getFilename";

const sanitizeSections = rawSections => {
    return Array.isArray(rawSections) ? rawSections.map(Number) : []
}

export default class Book extends Model {
    static table = "books"
    static associations = {
        folders: {type: "belongs_to", key: "folder_id"},
    }

    @text("title") title
    @text("cover") cover
    @text("author") author
    @text("uri") uri
    @text("description") description
    @text("language") language
    @field("progress") progress
    @field("total_pages") totalPages
    @field("page") page
    @field("cfi_location") cfiLocation
    @field("time_spent") timeSpent
    @field("is_finished") isFinished
    @json("initial_locations", json => json) initialLocations
    @json("sections_percentages", sanitizeSections) sectionsPercentages
    @relation("folders", "folder_id") folder
    @date("last_interaction_at") lastInteractionAt

    get filename() {
        return getFilename(this.uri)
    }

    @writer
    async toggleIsFinished() {
        await this.update(book => {
            book.isFinished = !book.isFinished;
        })
    }

    @writer
    async changeCfiLocation(cfiLocation) {
        await this.update(book => {
            book.cfiLocation = cfiLocation;
        })
    }

    @writer
    async changeCurrentPage(page, progress) {
        await this.update(book => {
            book.page = page;
            book.progress = progress;
        })
    }

    @writer
    async changeTotalPages(totalPages) {
        await this.update(book => {
            book.totalPages = totalPages;
        })
    }

    @writer
    async changeInitialLocations(locations) {
        await this.update(book => {
            book.initialLocations = locations;
        })
    }

    @writer
    async changeSectionsPercentages(percentages) {
        await this.update(book => {
            book.sectionsPercentages = percentages;
        })
    }

    @writer
    async changeMeta(title, author, description, language, folder) {
        let newUri = null;
        if (this.folder.id !== folder.id) {
            newUri = await this.changeLocation(folder.uri, this.uri, this.filename);
        }

        await this.update(book => {
            book.title = title;
            book.author = author;
            book.description = description;
            book.language = language;
            if (book.folder.id !== folder.id && newUri) {
                book.folder.id = folder.id;
                book.uri = newUri;
            }
        })
    }

    @writer
    async delete() {
        await StorageAccessFramework.deleteAsync(this.uri);
        await this.destroyPermanently();
        return true;
    }

    async changeLocation(parentUri, fileUri, filename) {
        const options = {
            encoding: "base64",
        };
        const newUri = await StorageAccessFramework.createFileAsync(parentUri, filename.split(".")[0], "application/epub+zip");
        const content = await StorageAccessFramework.readAsStringAsync(fileUri, options);
        await StorageAccessFramework.writeAsStringAsync(newUri, content, options);
        await StorageAccessFramework.deleteAsync(this.uri);
        return newUri;
    }
}