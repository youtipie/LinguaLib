import DrawerNavigation from "./DrawerNavigation";
import {NavigationContainer} from "@react-navigation/native";
import SelectSettings from "../../screens/Settings/SelectSettings";
import {drawerIcons, headerStyle} from "../../constants/styles";
import {createStackNavigator} from "@react-navigation/stack";
import HeaderButton from "./HeaderButton";
import Details from "../../screens/Details";

const Stack = createStackNavigator();

const stackScreens = [
    {name: 'Drawer', options: {headerShown: false}, component: DrawerNavigation},
    {name: 'SelectSettings', options: {}, component: SelectSettings},
    {name: 'Details', options: {title: 'Details'}, component: Details},
]

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
                {stackScreens.map((screen, index) => (
                    <Stack.Screen
                        key={index}
                        name={screen.name}
                        component={screen.component}
                        options={screen.options}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;