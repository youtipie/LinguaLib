import {StatusBar} from "react-native";
import {fonts} from "./src/constants/styles";
import * as SplashScreen from "expo-splash-screen";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import Navigation from "./src/components/navigation/Navigation";
import {Provider} from "react-redux";
import {store, persistor} from "./src/store/store";
import {PersistGate} from "redux-persist/integration/react";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [loaded, error] = useFonts({
        [fonts.primaryRegular]: require('./assets/fonts/Montserrat-Regular.ttf'),
        [fonts.primaryBold]: require('./assets/fonts/Montserrat-Bold.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <>
            <StatusBar style="light"/>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Navigation/>
                </PersistGate>
            </Provider>
        </>
    )
}