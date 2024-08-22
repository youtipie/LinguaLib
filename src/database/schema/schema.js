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
                {name: "annotation", type: "string"},
                {name: "language", type: "string"},
                {name: "progress", type: "number"},
                {name: "is_finished", type: "boolean"},
                {name: "folder_id", type: "string", isIndexed: true},
                {name: "last_interaction_at", type: "number"}
            ]
        })
    ]
})