import {
    DrawerContentScrollView, DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import {colors, drawerIcons} from "../constants/styles";
import {StyleSheet} from "react-native";
import {horizontalScale, moderateScale} from "../utils/metrics";
import DrawerIcon from "../UI/DrawerIcon";
import {DrawerActions} from "@react-navigation/native";


const DrawerCustomContent = (props) => {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
            <DrawerItem
                label={"LinguaLib"}
                onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
                icon={({color, focused}) =>
                    <DrawerIcon icon={drawerIcons.header} size={moderateScale(32)} color={color} focused={focused}/>
                }
                inactiveBackgroundColor={colors.primary100}
                inactiveTintColor={colors.textPrimary100}
                labelStyle={styles.label}
                style={styles.header}
            />
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    );
};

export default DrawerCustomContent;

const styles = StyleSheet.create({
    header: {
        marginHorizontal: 0,
        borderRadius: 0,
        marginTop: 0,
        paddingLeft: horizontalScale(11),
    },
    scrollView: {
        paddingTop: 0,
    },
    label: {
        fontSize: moderateScale(24),
        fontWeight: "bold",
        marginLeft: -horizontalScale(15)
    }
});