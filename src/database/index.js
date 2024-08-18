import {Database} from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import schema from "./schema/schema";
import migrations from "./migrations";
import Folder from "./models/Folder";
import Book from "./models/Book";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";

const adapter = new LokiJSAdapter({
    schema,
    migrations,
    useWebWorker: false,
    useIncrementalIndexedDB: true,
    onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
    }
})

const database = new Database({
    adapter,
    modelClasses: [Folder, Book],
})

export default database;