import {useEffect, useState} from 'react';
import {horizontalScale, moderateScale} from "../../utils/metrics";
import DrawerIcon from "./DrawerIcon";
import {colors, drawerIcons} from "../../constants/styles";
import {Pressable, Keyboard} from "react-native";
import InputField from "../../UI/InputField";

const HeaderSearchButton = ({navigation, defaultValue, onTextChange}) => {
    const [isInputOpened, setIsInputOpened] = useState(false);

    // TODO: If I want to use it, I have to fix bug, where reopening search always display empty input
    // useEffect(() => {
    //     const closeListener = Keyboard.addListener(
    //         "keyboardDidHide", () => setIsInputOpened(false)
    //     )
    //
    //     return () => closeListener.remove();
    // }, []);

    useEffect(() => {
        if (isInputOpened) {
            // TODO: Fix header to be full size from left to right
            navigation.setOptions({
                headerTitle: () =>
                    <InputField
                        placeholder="Enter title"
                        defaultValue={defaultValue}
                        onChangeText={onTextChange}
                        autoFocus={true}
                    />,
            });
        } else {
            navigation.setOptions({
                headerTitle: undefined,
            });
        }
    }, [isInputOpened, navigation]);

    function handleIconPress() {
        setIsInputOpened(prevState => !prevState);
    }

    return (
        <Pressable
            style={{
                paddingRight: horizontalScale(20),
            }}
            onPress={handleIconPress}
        >
            <DrawerIcon
                icon={drawerIcons.search}
                size={moderateScale(24)}
                color={colors.textPrimary100}
            />
        </Pressable>
    );
};

export default HeaderSearchButton;