import {View, Text, StyleSheet} from "react-native";
import {colors, fonts} from "../../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../../utils/metrics";


const ReadingOption = ({label, children}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {children}
        </View>
    );
};

export default ReadingOption;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary100,
        paddingHorizontal: horizontalScale(15),
        paddingTop: verticalScale(10),
        height: moderateScale(55),
        width: moderateScale(225),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginVertical: verticalScale(5),
    },
    label: {
        fontSize: moderateScale(12),
        fontFamily: fonts.primaryRegular,
        color: colors.textAccent100,
        textTransform: "uppercase",
        position: "absolute",
        left: horizontalScale(5),
        top: horizontalScale(2),
    }
});