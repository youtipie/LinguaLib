import {colors} from "../../constants/styles";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {View, StyleSheet} from "react-native";
import {horizontalScale} from "../../utils/metrics";

const DrawerIcon = ({icon, color, size, focused}) => {
    return (
        <View style={styles.iconWrapper}>
            <FontAwesomeIcon
                icon={icon}
                color={focused ? colors.success200 : color}
                size={size}
            />
        </View>
    );
};

export default DrawerIcon;

const styles = StyleSheet.create({
    iconWrapper: {
        minWidth: horizontalScale(50),
        alignItems: "center",
        justifyContent: "center",
        marginRight: -horizontalScale(15),
    }
});