import BookList from "../components/BookList";
import {useEffect} from "react";
import {withObservables} from "@nozbe/watermelondb/react";
import {BookDAO} from "../database";
import useFetchNewBooks from "../hooks/useFetchNewBooks";
import useHeaderSearch from "../hooks/useHeaderSearch";


const ReadingNow = ({navigation, books}) => {
    const fetchNewBooks = useFetchNewBooks();
    useHeaderSearch({navigation});

    useEffect(() => {
        return navigation.addListener("focus", async () => {
            await fetchNewBooks();
        })
    }, [navigation]);

    return (
        <BookList books={books} isAbleToFetchNewBooks={true}/>
    );
};

const enhance = withObservables(["route"], ({route}) => {
    const searchValue = route.params?.inputValue;
    const query = searchValue ? BookDAO.querySearchReadingNowBooks(searchValue) : BookDAO.queryReadingNowBooks()
    return {
        books: query,
    }
});

export default enhance(ReadingNow);

