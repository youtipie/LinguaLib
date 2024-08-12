import DrawerNavigation from "./DrawerNavigation";
import {NavigationContainer} from "@react-navigation/native";
import SelectSettings from "../../screens/Settings/SelectSettings";
import {drawerIcons, headerStyle} from "../../constants/styles";
import {createStackNavigator} from "@react-navigation/stack";
import HeaderButton from "./HeaderButton";

const Stack = createStackNavigator();

// TODO: Maybe replace all this styling bs with custom header component
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={({navigation}) => ({
                    ...headerStyle,
                    headerLeft: () => <HeaderButton
                        onPress={() => navigation.goBack()}
                        icon={drawerIcons.goBack}
                    />,
                })}
            >
                <Stack.Screen
                    name="Drawer"
                    component={DrawerNavigation}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="SelectSettings"
                    component={SelectSettings}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;