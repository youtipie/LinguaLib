import BookList from "../components/BookList";
import useHeaderSearch from "../hooks/useHeaderSearch";
import {useState} from "react";
import {mockBooks} from "../constants/other";


const ReadingNow = ({navigation}) => {
    const [books, setBooks] = useState(mockBooks);
    useHeaderSearch({navigation, books: mockBooks, setBooks});

    return (
        <BookList books={books}/>
    );
};

export default ReadingNow;

