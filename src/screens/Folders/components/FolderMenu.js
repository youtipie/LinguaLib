import {StyleSheet, Text, View} from "react-native";
import {colors, commonIcons, fonts} from "../../../constants/styles";
import {horizontalScale, moderateScale} from "../../../utils/metrics";
import {Menu, MenuOption, MenuOptions, MenuTrigger, renderers} from "react-native-popup-menu";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

const FolderMenu = ({folder}) => {
    return (
        <Menu>
            <MenuTrigger>
                <FontAwesomeIcon
                    icon={commonIcons.dotsHorizontal}
                    size={moderateScale(24)}
                    color={colors.textPrimary200}
                />
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.menuOptions}>
                <MenuOption onSelect={() => console.log(`rename${folder.id}`)}>
                    <View style={styles.menuOption}>
                        <FontAwesomeIcon
                            icon={commonIcons.editSquare}
                            size={moderateScale(20)}
                            color={colors.textPrimary200}
                        />
                        <Text style={styles.optionText}>Rename</Text>
                    </View>
                </MenuOption>
                <MenuOption onSelect={() => console.log(`remove${folder.id}`)}>
                    <View style={styles.menuOption}>
                        <FontAwesomeIcon
                            icon={commonIcons.minusSquare}
                            size={moderateScale(20)}
                            color={colors.textPrimary200}
                        />
                        <Text style={styles.optionText}>Remove</Text>
                    </View>
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
};

export default FolderMenu;

const styles = StyleSheet.create({
    menuOptions: {
        backgroundColor: colors.menu100,
        padding: moderateScale(5),
        width: "auto",
        borderRadius: moderateScale(5),
    },
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