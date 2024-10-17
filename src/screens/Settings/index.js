import {useCallback} from "react";
import {StyleSheet, ScrollView, Linking, Alert} from "react-native";
import {colors} from "../../constants/styles";
import {moderateScale} from "../../utils/metrics";
import {buyMeACoffeeUrl} from "../../constants/other";
import Section from "./compontens/Section";
import SectionItemWithSwitch from "./compontens/SectionItemWithSwitch";
import SectionItem from "./compontens/SectionItem";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAllAppSettings,
    appSettingsFields,
    updateAppSetting,
    translatingEngines, UILanguages
} from "../../store/reducers/settings";
import {getLanguages} from "../../services/translate.service";

const Settings = ({navigation}) => {
    const settings = useSelector(selectAllAppSettings);
    const dispatch = useDispatch();

    const visitSupportPage = useCallback(async () => {
        const supported = await Linking.canOpenURL(buyMeACoffeeUrl);

        if (supported) {
            await Linking.openURL(buyMeACoffeeUrl);
        } else {
            Alert.alert(`Don't know how to open this URL: ${buyMeACoffeeUrl}`);
        }
    }, [buyMeACoffeeUrl]);

    function handleOnChange(fieldName) {
        return (value) => dispatch(updateAppSetting({value, name: fieldName}));
    }

    const targetLanguages = getLanguages(settings.translatingEngine);

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Section title="General">
                <SectionItemWithSwitch
                    defaultValue={settings.openBookOnStartUp}
                    text="Open book on start up"
                    subtext="Continue reading the book when the app starts"
                    onChange={handleOnChange(appSettingsFields.openBookOnStartUp)}
                />
            </Section>

            <Section title="Reading">
                <SectionItemWithSwitch
                    defaultValue={settings.fullScreenMode}
                    text="Full screen mode"
                    subtext="Hide navigation panel and status bar"
                    onChange={handleOnChange(appSettingsFields.fullScreenMode)}
                />
                <SectionItemWithSwitch
                    defaultValue={settings.screenShutdownDelay}
                    text="Screen shutdown delay"
                    subtext="Leave the screen on for a longer period than the average use of a phone"
                    onChange={handleOnChange(appSettingsFields.screenShutdownDelay)}
                />
                <SectionItemWithSwitch
                    defaultValue={settings.volumeButtons}
                    text="Volume buttons"
                    subtext="Use the volume buttons to turn pages. Volume down - previous page, volume up - next page"
                    onChange={handleOnChange(appSettingsFields.volumeButtons)}
                />
            </Section>

            <Section title="Translating">
                <SectionItem
                    onPress={() => navigation.navigate("SelectSettings", {
                        title: "Translating engine",
                        description: "Select the translation engine to use for translating text in your books. More engines may be added in the future.",
                        data: Object.values(translatingEngines).reduce((ret, value) => {
                            ret[value] = value;
                            return ret;
                        }, {}),
                        defaultValue: settings.translatingEngine,
                        fieldName: appSettingsFields.translatingEngine
                    })}
                    text="Translating engine"
                    subtext={`Chosen: ${settings.translatingEngine}`}
                />
                <SectionItem
                    onPress={() => navigation.navigate("SelectSettings", {
                        title: "Target language",
                        description: "Select the language into which your books will be translated. Please note that this list may differ from one translation engine to another.",
                        data: targetLanguages,
                        defaultValue: settings.targetLanguage,
                        fieldName: appSettingsFields.targetLanguage
                    })}
                    text="Target language"
                    subtext={`Chosen: ${targetLanguages[settings.targetLanguage]}`}
                />
            </Section>

            <Section title="Other">
                <SectionItem
                    onPress={() => navigation.navigate("SelectSettings", {
                        title: "Language",
                        description: "Select the interface language. Please note that this option is not relevant for the translation language. To change the translation language, go to Settings, Translation section",
                        data: UILanguages,
                        defaultValue: settings.language,
                        fieldName: appSettingsFields.language
                    })}
                    text="UI language"
                    subtext={`Chosen: ${UILanguages[settings.language]}`}
                />
                <SectionItem
                    onPress={visitSupportPage}
                    text="Support"
                    subtext="Buy me a coffee ;)"
                />
            </Section>
        </ScrollView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        backgroundColor: colors.primary200,
        padding: moderateScale(15),
        paddingTop: 0,
    },
});