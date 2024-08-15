import {StyleSheet, Text, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {MenuOption} from "react-native-popup-menu";
import {horizontalScale, moderateScale} from "../../utils/metrics";
import {colors, fonts} from "../../constants/styles";

const MenuItem = ({icon, iconSize, iconColor, label, disabled, onSelect, textStyles, customIcon}) => {
    return (
        <MenuOption onSelect={onSelect} disabled={disabled}>
            <View style={styles.menuOption}>
                {customIcon ?
                    customIcon
                    :
                    <FontAwesomeIcon
                        icon={icon}
                        size={iconSize}
                        color={iconColor}
                    />
                }
                <Text style={[styles.optionText, textStyles]}>{label}</Text>
            </View>
        </MenuOption>
    );
};

export default MenuItem;

const styles = StyleSheet.create({
    menuOption: {
        flexDirection: "row",
        alignItems: "center",
    },
    optionText: {
        fontFamily: fonts.primaryRegular,
        color: colors.textPrimary200,
        fontSize: moderateScale(20),
        marginLeft: horizontalScale(5)
    },
});
