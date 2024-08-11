import BookList from "../components/BookList";
import useHeaderSearch from "../hooks/useHeaderSearch";
import {useState} from "react";

const DummyBooks = [
    {
        id: 1,
        title: "The Witcher - Blood of Elves",
        author: "Andrzej Sapkowski",
        progress: 1,
        coverUri: "https://m.media-amazon.com/images/I/81Al+uu84qL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 2,
        title: "Harry Potter and the Deathly Hallows",
        author: "J.K. Rowling",
        progress: 1,
        coverUri: "https://nebobookshop.com.ua/cloud/files/uploads/books/9781408855713_us.jpg"
    },
    {
        id: 3,
        title: "The Witcher - Blood of Elves",
        author: "Andrzej Sapkowski",
        progress: 1,
        coverUri: "https://m.media-amazon.com/images/I/81Al+uu84qL._AC_UF1000,1000_QL80_.jpg"
    },
];

const FinishedReading = ({navigation}) => {
    const [books, setBooks] = useState(DummyBooks);
    useHeaderSearch({navigation, books: DummyBooks, setBooks});

    return (
        <BookList books={books}/>
    );
};

export default FinishedReading;