import {View, StyleSheet, Pressable} from "react-native";
import {colors, commonIcons} from "../../../constants/styles";
import {horizontalScale, moderateScale} from "../../../utils/metrics";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

const HeaderDetailsEditMenu = ({onCancel, onConfirm}) => {
    return (
        <View style={styles.iconsWrapper}>
            <Pressable onPress={onCancel}>
                <FontAwesomeIcon
                    icon={commonIcons.crossCircle}
                    color={colors.accent100}
                    size={moderateScale(24)}
                />
            </Pressable>
            <Pressable onPress={onConfirm}>
                <FontAwesomeIcon
                    icon={commonIcons.confirmCircle}
                    color={colors.success100}
                    size={moderateScale(24)}
                />
            </Pressable>
        </View>
    );
};

export default HeaderDetailsEditMenu;

const styles = StyleSheet.create({
    iconsWrapper: {
        flexDirection: 'row',
        marginRight: horizontalScale(15),
        width: horizontalScale(50),
        justifyContent: 'space-between',
    },
});