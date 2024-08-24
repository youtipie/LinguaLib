import {
    FlatList,
    Keyboard,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Text,
    RefreshControl,
} from "react-native";
import BookCard, {EnhancedBookCard} from "./BookCard";
import {colors, fonts} from "../constants/styles";
import {moderateScale, verticalScale} from "../utils/metrics";
import useFetchNewBooks from "../hooks/useFetchNewBooks";
import {useState} from "react";


const BookList = ({books, isAbleToFetchNewBooks = false}) => {
    const fetchNewBooks = useFetchNewBooks();
    const [refreshing, setRefreshing] = useState(false);

    async function handleRefresh() {
        if (isAbleToFetchNewBooks) {
            setRefreshing(true);
            await fetchNewBooks();
            setRefreshing(false);
        }
    }

    if (books.length % 2 !== 0) {
        books.push({isBlank: true});
    }

    const content = (
        <View style={styles.root}>
            <FlatList
                data={books}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={(itemData) => {
                    if (itemData.item.isBlank) {
                        return <BookCard book={itemData.item}/>
                    }
                    return <EnhancedBookCard book={itemData.item}/>
                }}
                contentContainerStyle={styles.contentContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}
                ListEmptyComponent={
                    <View style={styles.emptyWrapper}>
                        <Text style={styles.emptyText}>There is nothing here...</Text>
                    </View>
                }
            />
        </View>
    );

    return (
        Keyboard.isVisible() ?
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                {content}
            </TouchableWithoutFeedback>
            :
            content
    );
};

export default BookList;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary200,
    },
    contentContainer: {
        paddingVertical: verticalScale(5),
    },
    emptyWrapper: {
        marginTop: verticalScale(10),
    },
    emptyText: {
        fontFamily: fonts.primaryRegular,
        color: colors.textAccent100,
        fontSize: moderateScale(20),
    }
});