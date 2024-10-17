import {horizontalScale, moderateScale} from "../../utils/metrics";
import DrawerIcon from "./DrawerIcon";
import {colors} from "../../constants/styles";
import {Pressable} from "react-native";

const HeaderButton = ({onPress, icon}) => {

    return (
        <Pressable
            style={{
                height: "100%", // More space, so user can't miss the button
                justifyContent: "center",
                paddingLeft: horizontalScale(5), // Maybe remove?
            }}
            onPress={onPress}
        >
            <DrawerIcon
                icon={icon}
                size={moderateScale(24)}
                color={colors.textPrimary100}
            />
        </Pressable>
    );
};

export default HeaderButton;