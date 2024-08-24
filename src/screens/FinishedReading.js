import BookList from "../components/BookList";
import useHeaderSearch from "../hooks/useHeaderSearch";
import {withObservables} from "@nozbe/watermelondb/react";
import BookDAO from "../database/DAO/BookDAO";


const FinishedReading = ({navigation, books}) => {
    useHeaderSearch({navigation});

    return (
        <BookList books={books}/>
    );
};

const enhance = withObservables(["route"], ({route}) => {
    const searchValue = route.params?.inputValue;
    const query = searchValue ? BookDAO.querySearchFinishedBooks(searchValue) : BookDAO.queryFinishedBooks()
    return {
        books: query,
    }
});

export default enhance(FinishedReading);
