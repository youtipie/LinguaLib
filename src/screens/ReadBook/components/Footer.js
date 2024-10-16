import {View, Text, StyleSheet} from "react-native";
import {colors, fonts} from "../../../constants/styles";
import {moderateScale, verticalScale} from "../../../utils/metrics";

const Footer = ({progressbarComponent, totalPages, currentPage}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{currentPage}/{totalPages}</Text>
            {progressbarComponent}
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: colors.primary200,
        zIndex: 10005,
        paddingVertical: verticalScale(10)
    },
    text: {
        fontSize: moderateScale(20),
        fontFamily: fonts.primaryRegular,
        color: colors.textPrimary200,
        textAlign: "center"
    }
});