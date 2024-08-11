import {horizontalScale, moderateScale} from "../../utils/metrics";
import DrawerIcon from "./DrawerIcon";
import {colors, drawerIcons} from "../../constants/styles";
import {Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";

const HeaderMenuButton = () => {
    const navigation = useNavigation();

    return (
        <Pressable
            style={{
                height: "100%", // More space, so user can't miss the button
                justifyContent: "center",
                paddingLeft: horizontalScale(5), // Maybe remove?
            }}
            onPress={() => navigation.toggleDrawer()}
        >
            <DrawerIcon
                icon={drawerIcons.openDrawer}
                size={moderateScale(24)}
                color={colors.textPrimary100}
            />
        </Pressable>
    );
};

export default HeaderMenuButton;