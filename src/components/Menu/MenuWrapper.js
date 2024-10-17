import {Menu, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {StyleSheet} from "react-native";
import {moderateScale} from "../../utils/metrics";

const MenuWrapper = ({
                         trigger,
                         options,
                         onClose,
                         onOpen,
                         toggleIsOpen = null,
                         optionsContainerStyle,
                         renderer,
                         rendererProps,
                         width = "auto"
                     }) => {
    const styles = StyleSheet.create({
        menuOptions: {
            padding: moderateScale(5),
            width: width,
        },
    });

    if (!toggleIsOpen) {
        toggleIsOpen = () => {
        };
    }

    function handleOnClose() {
        onClose && onClose();
        toggleIsOpen();
    }

    function handleOnOpen() {
        onOpen && onOpen();
        toggleIsOpen();
    }

    return (
        <Menu renderer={renderer} onClose={handleOnClose} onOpen={handleOnOpen} rendererProps={rendererProps}>
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