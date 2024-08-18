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
                {name: "name", type: "string"},
                {name: "folder_id", type: "string", isIndexed: true},
                {name: "last_interaction_at", type: "number"}
            ]
        })
    ]
})