import {Menu, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {ScrollView, StyleSheet} from "react-native";
import {moderateScale} from "../../utils/metrics";

const MenuWrapper = ({trigger, options, toggleIsOpen = null, menuItem, optionsContainerStyle, renderer}) => {
    if (!toggleIsOpen) {
        toggleIsOpen = () => {
        };
    }

    return (
        <Menu renderer={renderer} onClose={toggleIsOpen} onOpen={toggleIsOpen}>
            <MenuTrigger>
                {trigger}
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={[styles.menuOptions, optionsContainerStyle]}>
                <ScrollView>
                    {options.map((option, index) => (
                        menuItem(option, index)
                    ))}
                </ScrollView>
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
