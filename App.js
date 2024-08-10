import {ReaderProvider} from '@epubjs-react-native/core';
import Main from "./src/components/Main";


export default function App() {
    return (
        <ReaderProvider>
            <Main/>
        </ReaderProvider>
    )
}