import BookCard from "./BookCard";
import {FlatList, StyleSheet} from "react-native";
import {colors} from "../constants/styles";
import {verticalScale} from "../utils/metrics";

const BookList = ({books}) => {
    return (
        <FlatList
            style={styles.root}
            data={books}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={(itemData) => <BookCard {...itemData.item}/>}
            contentContainerStyle={styles.contentContainer}
        />
    );
};

export default BookList;

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.primary200,
    },
    contentContainer: {
        marginHorizontal: "auto",
        paddingVertical: verticalScale(5),
    }
});