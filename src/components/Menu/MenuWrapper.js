import {Menu, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {StyleSheet} from "react-native";
import {moderateScale} from "../../utils/metrics";
import MenuItem from "./MenuItem";

const MenuWrapper = ({trigger, options, optionsContainerStyle}) => {
    return (
        <Menu>
            <MenuTrigger>
                {trigger}
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={[styles.menuOptions, optionsContainerStyle]}>
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        icon={option.icon}
                        label={option.label}
                        onSelect={option.action}
                    />
                ))}
            </MenuOptions>
        </Menu>
    );
};

export default MenuWrapper;

const styles = StyleSheet.create({
    menuOptions: {
        padding: moderateScale(5),
        width: "auto",
    },
});
