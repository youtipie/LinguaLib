import BookCard from "./BookCard";
import {FlatList, Keyboard, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {colors} from "../constants/styles";
import {verticalScale} from "../utils/metrics";

// TODO: Get rid of FlatList. It's shit
const BookList = ({books}) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.root}>
                <FlatList
                    data={books}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    renderItem={(itemData) => <BookCard {...itemData.item}/>}
                    contentContainerStyle={styles.contentContainer}
                    columnWrapperStyle={{justifyContent: "space-between"}}
                />
            </View>
        </TouchableWithoutFeedback>
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
    }
});