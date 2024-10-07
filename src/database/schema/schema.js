import {appSchema, tableSchema} from '@nozbe/watermelondb'

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: "folders",
            columns: [
                {name: "title", type: "string"},
                {name: "uri", type: "string"},
                {name: "is_default", type: "boolean"} // Default is false
            ]
        }),
        tableSchema({
            name: "books",
            columns: [
                {name: "title", type: "string"},
                {name: "cover", type: "string"},
                {name: "author", type: "string"},
                {name: "uri", type: "string"},
                {name: "description", type: "string"},
                {name: "language", type: "string"},
                {name: "progress", type: "number"},
                {name: "total_pages", type: "number"},
                {name: "page", type: "number"},
                {name: "cfi_location", type: "string"},
                {name: "time_spent", type: "number"},
                {name: "is_finished", type: "boolean"},
                {name: "initial_locations", type: "string"},
                {name: "sections_percentages", type: "string"},
                {name: "folder_id", type: "string", isIndexed: true},
                {name: "last_interaction_at", type: "number"}
            ]
        }),
        tableSchema({
            name: "sections",
            columns: [
                {name: "href", type: "string"},
                {name: "book_id", type: "string"},
            ]
        }),
        tableSchema({
            name: "text_elements",
            columns: [
                {name: "content", type: "string"},
                {name: "index", type: "number"},
                {name: "is_translated", type: "boolean"},
                {name: "section_id", type: "string", isIndexed: true},
            ]
        })
    ]
})