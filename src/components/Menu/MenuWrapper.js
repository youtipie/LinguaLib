import {Menu, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {ScrollView, StyleSheet} from "react-native";
import {moderateScale} from "../../utils/metrics";

const MenuWrapper = ({trigger, options, toggleIsOpen = null, optionsContainerStyle, renderer, rendererProps}) => {
    if (!toggleIsOpen) {
        toggleIsOpen = () => {
        };
    }

    return (
        <Menu renderer={renderer} onClose={toggleIsOpen} onOpen={toggleIsOpen} rendererProps={rendererProps}>
            <MenuTrigger>
                {trigger}
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={[styles.menuOptions, optionsContainerStyle]}>
                {options}
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
