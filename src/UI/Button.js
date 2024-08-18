import {Text, TouchableOpacity, StyleSheet} from "react-native";
import {horizontalScale, moderateScale, verticalScale} from "../utils/metrics";
import {colors, fonts} from "../constants/styles";

const Button = ({text, onPress, textStyle, containerStyle}) => {
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: verticalScale(3),
        backgroundColor: colors.primary200,
        borderRadius: 3,
        minWidth: horizontalScale(140)
    },
    text: {
        fontFamily: fonts.primaryRegular,
        fontSize: moderateScale(16),
        color: colors.textPrimary100,
    }
});