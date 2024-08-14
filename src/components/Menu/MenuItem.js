import {StyleSheet, Text, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {MenuOption} from "react-native-popup-menu";
import {horizontalScale, moderateScale} from "../../utils/metrics";
import {colors, fonts} from "../../constants/styles";

const MenuItem = ({icon, label, onSelect}) => {
    return (
        <MenuOption onSelect={onSelect}>
            <View style={styles.menuOption}>
                <FontAwesomeIcon
                    icon={icon}
                    size={moderateScale(20)}
                    color={colors.textPrimary200}
                />
                <Text style={styles.optionText}>{label}</Text>
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
