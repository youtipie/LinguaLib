import DrawerCustomContent from "./DrawerContent";
import {colors, drawerIcons, fonts} from "../../constants/styles";
import {horizontalScale, moderateScale} from "../../utils/metrics";
import {Pressable} from "react-native";
import DrawerIcon from "./DrawerIcon";
import ReadingNow from "../../screens/ReadingNow";
import {createDrawerNavigator} from "@react-navigation/drawer";
import FinishedReading from "../../screens/FinishedReading";
import About from "../../screens/About";

const Drawer = createDrawerNavigator();

const drawerScreens = [
    {name: 'ReadingNow', title: 'Reading Now', icon: drawerIcons.reading, component: ReadingNow},
    {name: 'Finished', title: 'Finished reading', icon: drawerIcons.finished, component: FinishedReading},
    {name: 'Folders', title: 'Folders', icon: drawerIcons.folders, component: ReadingNow},
    {name: 'Settings', title: 'Settings', icon: drawerIcons.settings, component: ReadingNow},
    {name: 'About', title: 'About', icon: drawerIcons.about, component: About},
];

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerCustomContent {...props} />}
            screenOptions={({navigation}) => ({
                headerStyle: {
                    backgroundColor: colors.primary100,
                },
                headerTitleStyle: {
                    fontSize: moderateScale(24),
                    fontFamily: fonts.primaryBold,
                },
                headerLeft: () =>
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
                    </Pressable>,
                headerRight: () =>
                    <Pressable
                        style={{
                            paddingRight: horizontalScale(20),
                        }}
                        onPress={() => {
                        }}
                    >
                        <DrawerIcon
                            icon={drawerIcons.search}
                            size={moderateScale(24)}
                            color={colors.textPrimary100}
                        />
                    </Pressable>,
                headerTintColor: colors.textPrimary100,
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