import {View, StyleSheet, Text} from "react-native";
import {colors, fonts} from "../constants/styles";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBullseye, faCircleInfo, faClipboardList} from "@fortawesome/free-solid-svg-icons";
import {horizontalScale, moderateScale, verticalScale} from "../utils/metrics";

const About = () => {
    return (
        <View style={styles.root}>
            <View style={styles.section}>
                <View style={styles.titleWrapper}>
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        size={moderateScale(18)}
                        color={colors.success100}
                        style={styles.icon}
                    />
                    <Text style={[styles.text, styles.title]}>About LinguaLib</Text>
                </View>
                <Text style={styles.text}>
                    Welcome to LinguaLib, your gateway to a world of literature without language barriers!
                    {"\n\n"}
                    At LinguaLib, we believe that every book should be accessible to everyone, regardless of language.
                    Our innovative app offers a unique reading experience by seamlessly translating ebooks in the
                    background as you read. This means you can dive into any book in any language, and our app will
                    handle the rest, translating upcoming pages so you can enjoy a smooth, uninterrupted reading
                    journey.
                </Text>
            </View>
            <View style={styles.section}>
                <View style={styles.titleWrapper}>
                    <FontAwesomeIcon
                        icon={faBullseye}
                        size={moderateScale(18)}
                        color={colors.success100}
                        style={styles.icon}
                    />
                    <Text style={[styles.text, styles.title]}>Our Mission</Text>
                </View>
                <Text style={styles.text}>
                    Our mission is to bridge the gap between languages and bring the joy of reading to everyone. We
                    understand that language can sometimes be a barrier to exploring new stories and ideas. With
                    LinguaLib, we aim to remove this barrier and open up a world of knowledge, culture, and
                    entertainment to all readers.
                </Text>
            </View>
            <View style={styles.section}>
                <View style={styles.titleWrapper}>
                    <FontAwesomeIcon
                        icon={faClipboardList}
                        size={moderateScale(18)}
                        color={colors.success100}
                        style={styles.icon}
                    />
                    <Text style={[styles.text, styles.title]}>How It Works</Text>
                </View>
                <Text style={styles.text}>
                    LinguaLib uses advanced translation technology to translate text as you read. When you open a book,
                    our app begins translating the next few pages in the background, ensuring a smooth and uninterrupted
                    reading experience. Users can choose from different translation engines, allowing them to select the
                    one that best suits their needs and preferences. This feature provides flexibility and accuracy,
                    catering to a variety of languages and dialects.
                </Text>
            </View>
        </View>
    );
};

export default About;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.primary200,
        padding: moderateScale(15)
    },
    titleWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(10),
    },
    icon: {
        marginRight: horizontalScale(5),
    },
    text: {
        fontSize: moderateScale(16),
        fontFamily: fonts.primaryRegular,
        color: colors.textPrimary200,
    },
    title: {
        color: colors.success100,
    },
    section: {
        marginBottom: verticalScale(15),
    },
});