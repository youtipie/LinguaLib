import DrawerNavigation from "./DrawerNavigation";
import {NavigationContainer} from "@react-navigation/native";
import SelectSettings from "../../screens/Settings/SelectSettings";
import {drawerIcons, headerStyle} from "../../constants/styles";
import {createStackNavigator} from "@react-navigation/stack";
import HeaderButton from "./HeaderButton";
import Details from "../../screens/Details";
import ReadBook from "../../screens/ReadBook";
import ModalProvider from "../ModalProvider";
import {ReaderProvider} from "@epubjs-react-native/core";
import MetadataProvider from "../MetadataProvider";
import {MenuProvider} from "react-native-popup-menu";
import {useTranslation} from "react-i18next";

const Stack = createStackNavigator();


// TODO: Maybe replace all this styling bs with custom header component
const Navigation = () => {
    const {t} = useTranslation();

    const stackScreens = [
        {name: 'Drawer', options: {headerShown: false}, component: DrawerNavigation},
        {name: 'SelectSettings', options: {}, component: SelectSettings},
        {name: 'Details', options: {title: t("navigation.Details")}, component: Details},
        {name: 'ReadBook', options: {headerShown: false}, component: ReadBook},
    ]

    return (
        <NavigationContainer>
            <MenuProvider>
                <ModalProvider>
                    <ReaderProvider>
                        <MetadataProvider>
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
                        </MetadataProvider>
                    </ReaderProvider>
                </ModalProvider>
            </MenuProvider>
        </NavigationContainer>
    );
};

export default Navigation;