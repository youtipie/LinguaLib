import {useEffect, useLayoutEffect, useState} from 'react';
import HeaderSearchButton from "../components/navigation/HeaderSearchButton";

const UseHeaderSearch = ({navigation, books, setBooks}) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (inputValue) {
            const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(inputValue.toLowerCase()));
            setBooks(filteredBooks);
        } else {
            setBooks(books);
        }
    }, [inputValue]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <HeaderSearchButton
                    defaultValue={inputValue}
                    onTextChange={setInputValue}
                    navigation={navigation}
                />,
        });
    }, [navigation, inputValue, setInputValue]);
};

export default UseHeaderSearch;