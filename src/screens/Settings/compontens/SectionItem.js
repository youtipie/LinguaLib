import {Pressable, Text, StyleSheet, View} from "react-native";
import {colors, fonts} from "../../../constants/styles";
import {moderateScale, verticalScale} from "../../../utils/metrics";

const SectionItem = ({onPress, text, subtext}) => {
    return (
        <View style={styles.sectionItem}>
            <Pressable
                style={styles.sectionItemTextWrapper}
                onPress={onPress}
            >
                {text && <Text style={styles.sectionText}>{text}</Text>}
                {subtext && <Text style={styles.sectionSubText}>{subtext}</Text>}
            </Pressable>
        </View>
    );
};

export default SectionItem;

const styles = StyleSheet.create({
    sectionItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(5),
    },
    sectionText: {
        fontFamily: fonts.primaryRegular,
        color: colors.textPrimary200,
        fontSize: moderateScale(16)
    },
    sectionSubText: {
        fontFamily: fonts.primaryRegular,
        color: colors.textAccent100,
        fontSize: moderateScale(12)
    },
    sectionItemTextWrapper: {
        width: "90%"
    },
});