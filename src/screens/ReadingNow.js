import {StyleSheet, FlatList} from "react-native";
import {colors} from "../constants/styles";
import BookCard from "../components/BookCard";
import {verticalScale} from "../utils/metrics";

const DummyBooks = [
    {
        id: 1,
        title: "The Witcher - Blood of Elves",
        author: "Andrzej Sapkowski",
        progress: 0.4,
        coverUri: "https://m.media-amazon.com/images/I/81Al+uu84qL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 2,
        title: "Harry Potter and the Deathly Hallows",
        author: "J.K. Rowling",
        progress: 0.4,
        coverUri: "https://nebobookshop.com.ua/cloud/files/uploads/books/9781408855713_us.jpg"
    },
    {
        id: 3,
        title: "The Witcher - Blood of Elves",
        author: "Andrzej Sapkowski",
        progress: 0.4,
        coverUri: "https://m.media-amazon.com/images/I/81Al+uu84qL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 4,
        title: "Harry Potter and the Deathly Hallows",
        author: "J.K. Rowling",
        progress: 0.4,
        coverUri: "https://nebobookshop.com.ua/cloud/files/uploads/books/9781408855713_us.jpg"
    },
    {
        id: 5,
        title: "The Witcher - Blood of Elves",
        author: "Andrzej Sapkowski",
        progress: 0.4,
        coverUri: "https://m.media-amazon.com/images/I/81Al+uu84qL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 6,
        title: "Harry Potter and the Deathly Hallows",
        author: "J.K. Rowling",
        progress: 0.4,
        coverUri: "https://nebobookshop.com.ua/cloud/files/uploads/books/9781408855713_us.jpg"
    },
    {
        id: 7,
        title: "The Witcher - Blood of Elves",
        author: "Andrzej Sapkowski",
        progress: 0.4,
        coverUri: "https://m.media-amazon.com/images/I/81Al+uu84qL._AC_UF1000,1000_QL80_.jpg"
    },
];

const ReadingNow = () => {
    return (
        <FlatList
            style={styles.root}
            data={DummyBooks}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={(itemData) => <BookCard {...itemData.item}/>}
            contentContainerStyle={styles.contentContainer}
        />
    );
};

export default ReadingNow;

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.primary200,
    },
    contentContainer: {
        marginHorizontal: "auto",
        paddingVertical: verticalScale(5),
    }
});