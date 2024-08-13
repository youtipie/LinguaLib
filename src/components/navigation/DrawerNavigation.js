import DrawerCustomContent from "./DrawerContent";
import {colors, drawerIcons, fonts, headerStyle} from "../../constants/styles";
import {horizontalScale, moderateScale} from "../../utils/metrics";
import DrawerIcon from "./DrawerIcon";
import ReadingNow from "../../screens/ReadingNow";
import {createDrawerNavigator} from "@react-navigation/drawer";
import FinishedReading from "../../screens/FinishedReading";
import About from "../../screens/About";
import HeaderButton from "./HeaderButton";
import Folders from "../../screens/Folders";
import Settings from "../../screens/Settings";

const Drawer = createDrawerNavigator();

const drawerScreens = [
    {name: 'ReadingNow', title: 'Reading Now', icon: drawerIcons.reading, component: ReadingNow},
    {name: 'Finished', title: 'Finished reading', icon: drawerIcons.finished, component: FinishedReading},
    {name: 'Folders', title: 'Folders', icon: drawerIcons.folders, component: Folders},
    {name: 'Settings', title: 'Settings', icon: drawerIcons.settings, component: Settings},
    {name: 'About', title: 'About', icon: drawerIcons.about, component: About},
];

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerCustomContent {...props} />}
            screenOptions={({navigation}) => ({
                ...headerStyle,
                headerLeft: () => <HeaderButton
                    onPress={() => navigation.toggleDrawer()}
                    icon={drawerIcons.openDrawer}
                />,
                drawerActiveBackgroundColor: "transparent",
                drawerActiveTintColor: colors.success100,
                drawerInactiveTintColor: colors.textPrimary100,
                drawerLabelStyle: {
                    fontSize: moderateScale(20),
                    fontFamily: fonts.primaryRegular,
                    marginLeft: -horizontalScale(10),
                },
                drawerItemStyle: {
                    marginHorizontal: 0,
                    marginVertical: 0,
                },
                drawerStyle: {
                    backgroundColor: colors.primary200,
                }
            })}
        >
            {drawerScreens.map((screen, index) => (
                <Drawer.Screen
                    key={index}
                    name={screen.name}
                    component={screen.component}
                    options={{
                        title: screen.title,
                        drawerIcon: ({color, focused}) => (
                            <DrawerIcon
                                icon={screen.icon}
                                size={moderateScale(24)}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />
            ))}
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;