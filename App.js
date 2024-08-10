import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Pressable, StatusBar} from "react-native";
import ReadingNow from "./src/screens/ReadingNow";
import DrawerCustomContent from "./src/components/navigation/DrawerContent";
import {horizontalScale, moderateScale} from "./src/utils/metrics";
import {colors, drawerIcons} from "./src/constants/styles";
import DrawerIcon from "./src/components/navigation/DrawerIcon";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const drawerScreens = [
    {name: 'ReadingNow', title: 'Reading Now', icon: drawerIcons.reading, component: ReadingNow},
    {name: 'Finished', title: 'Finished reading', icon: drawerIcons.finished, component: ReadingNow},
    {name: 'Folders', title: 'Folders', icon: drawerIcons.folders, component: ReadingNow},
    {name: 'Settings', title: 'Settings', icon: drawerIcons.settings, component: ReadingNow},
    {name: 'About', title: 'About', icon: drawerIcons.about, component: ReadingNow},
];

function DrawerNavigation() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerCustomContent {...props} />}
            screenOptions={({navigation}) => ({
                headerStyle: {
                    backgroundColor: colors.primary100,

                },
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: moderateScale(24)
                },
                headerLeft: () =>
                    <Pressable
                        style={{
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
}

export default function App() {
    return (
        <>
            <StatusBar style="light"/>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Drawer" component={DrawerNavigation} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}