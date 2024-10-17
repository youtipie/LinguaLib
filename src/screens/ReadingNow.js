import BookList from "../components/BookList";
import {useEffect} from "react";
import {withObservables} from "@nozbe/watermelondb/react";
import useFetchNewBooks from "../hooks/useFetchNewBooks";
import useHeaderSearch from "../hooks/useHeaderSearch";
import BookDAO from "../database/DAO/BookDAO";
import {useDispatch, useSelector} from "react-redux";
import {appSettingsFields, changeLanguage, selectAllAppSettings, updateAppSetting} from "../store/reducers/settings";
import bookDAO from "../database/DAO/BookDAO";


const ReadingNow = ({navigation, books}) => {
    const fetchNewBooks = useFetchNewBooks();
    const {openBookOnStartUp, lastOpenedBook, language} = useSelector(selectAllAppSettings);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeLanguage(language));
    }, []);

    useHeaderSearch({navigation});

    useEffect(() => {
        return navigation.addListener("focus", async () => {
            dispatch(updateAppSetting({value: null, name: appSettingsFields.lastOpenedBook}));
            await fetchNewBooks();
        })
    }, [navigation]);

    useEffect(() => {
        if (lastOpenedBook && openBookOnStartUp && bookDAO.isExist(lastOpenedBook)) {
            navigation.navigate("ReadBook", {bookId: lastOpenedBook});
        }
    });

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

