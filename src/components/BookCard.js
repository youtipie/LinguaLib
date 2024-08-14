import {View, StyleSheet, Image, Pressable, Text} from "react-native";
import {colors, fonts} from "../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../utils/metrics";
import {useNavigation} from "@react-navigation/native";

const BookCard = ({id, title, author, progress, coverUri}) => {
    const navigation = useNavigation();

    function handleImgPress() {
        //     TODO: Go to reading book
    }

    function handleCardPress() {
        navigation.navigate("Details", {bookId: id});
    }

    const progressWidthStyle = {width: `${Math.trunc(progress * 100)}%`};

    return (
        <View style={styles.container}>
            <Pressable onPress={handleImgPress}>
                <View style={styles.progressBarWrapper}>
                    <View style={[styles.progressBar, progressWidthStyle]}></View>
                </View>
                <Image style={styles.coverImg} source={{uri: coverUri}}/>
            </Pressable>
            <Pressable onPress={handleCardPress}>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{author}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default BookCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary100,
        margin: horizontalScale(10),
        width: moderateScale(175),
    },
    coverImg: {
        height: moderateScale(280),
        objectFit: "cover", // TODO: Experiment with "contain" and "cover"
    },
    textWrapper: {
        flex: 1,
        padding: moderateScale(10),
    },
    title: {
        color: colors.textPrimary200,
        fontSize: moderateScale(16),
        fontFamily: fonts.primaryRegular,
        marginBottom: verticalScale(5),
    },
    subtitle: {
        color: colors.textAccent100,
        fontFamily: fonts.primaryRegular,
        fontSize: moderateScale(12),
    },
    progressBarWrapper: {
        position: "absolute",
        top: verticalScale(5),
        zIndex: 1000,
        width: "96%",
        height: verticalScale(8),
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        alignSelf: "center",
        borderRadius: 1000,
        overflow: "hidden"
    },
    progressBar: {
        height: "100%",
        backgroundColor: colors.statusBar,
        opacity: 1,
    }
});