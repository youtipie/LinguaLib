import {View, StyleSheet, Text, Pressable} from "react-native";
import {colors, fonts} from "../constants/styles";
import {horizontalScale, moderateScale} from "../utils/metrics";

const RadioButton = ({style, label, isSelected, onSelect}) => {
    return (
        <Pressable style={[styles.root, style]} onPress={onSelect} disabled={isSelected}>
            <View style={[styles.radioOuter, isSelected && styles.selectedOuter]}>
                <View style={[styles.radioInner, isSelected && styles.selectedInner]}></View>
            </View>
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
};

export default RadioButton;

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        alignItems: "center"
    },
    label: {
        color: colors.textPrimary200,
        fontFamily: fonts.primaryRegular,
        fontSize: moderateScale(16),
        marginLeft: horizontalScale(5)
    },
    radioOuter: {
        borderRadius: 1000,
        height: moderateScale(18),
        width: moderateScale(18),
        borderWidth: moderateScale(2),
        backgroundColor: "transparent",
        borderColor: colors.textAccent100,
        borderStyle: "solid",
        position: "relative"
    },
    radioInner: {
        borderRadius: 1000,
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: -moderateScale(6),
        marginTop: -moderateScale(6),
        height: moderateScale(12),
        width: moderateScale(12),
        backgroundColor: "transparent",
    },
    selectedOuter: {
        borderColor: colors.accent100,
    },
    selectedInner: {
        borderColor: colors.accent100,
        backgroundColor: colors.accent100,
    }
});