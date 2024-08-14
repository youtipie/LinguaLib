import BookList from "../components/BookList";
import useHeaderSearch from "../hooks/useHeaderSearch";
import {useState} from "react";
import {mockBooks} from "../constants/other";


const FinishedReading = ({navigation}) => {
    const [books, setBooks] = useState(mockBooks.slice(0, 3));
    useHeaderSearch({navigation, books: mockBooks.slice(0, 3), setBooks});

    return (
        <BookList books={books}/>
    );
};

export default FinishedReading;