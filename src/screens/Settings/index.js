import {useCallback} from "react";
import {StyleSheet, ScrollView, Linking, Alert} from "react-native";
import {colors} from "../../constants/styles";
import {moderateScale} from "../../utils/metrics";
import {buyMeACoffeeUrl} from "../../constants/other";
import Section from "./compontens/Section";
import SectionItemWithSwitch from "./compontens/SectionItemWithSwitch";
import SectionItem from "./compontens/SectionItem";
import {useDispatch, useSelector} from "react-redux";
import {selectAllSettings, settingsFields, updateSetting} from "../../store/reducers/settings";

const Settings = ({navigation}) => {
    const settings = useSelector(selectAllSettings);
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
        return (value) => dispatch(updateSetting({value, name: fieldName}));
    }

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Section title="General">
                <SectionItemWithSwitch
                    defaultValue={settings.openBookOnStartUp}
                    text="Open book on start up"
                    subtext="Continue reading the book when the app starts"
                    onChange={handleOnChange(settingsFields.openBookOnStartUp)}
                />
            </Section>

            <Section title="Reading">
                <SectionItemWithSwitch
                    defaultValue={settings.fullScreenMode}
                    text="Full screen mode"
                    subtext="Hide navigation panel and status bar"
                    onChange={handleOnChange(settingsFields.fullScreenMode)}
                />
                <SectionItemWithSwitch
                    defaultValue={settings.screenShutdownDelay}
                    text="Screen shutdown delay"
                    subtext="Leave the screen on for a longer period than the average use of a phone"
                    onChange={handleOnChange(settingsFields.screenShutdownDelay)}
                />
                <SectionItemWithSwitch
                    defaultValue={settings.animations}
                    text="Animations"
                    subtext="Show the animations when changing pages"
                    onChange={handleOnChange(settingsFields.animations)}
                />
                <SectionItemWithSwitch
                    defaultValue={settings.volumeButtons}
                    text="Volume buttons"
                    subtext="Use the volume buttons to turn pages. Volume down - previous page, volume up - next page"
                    onChange={handleOnChange(settingsFields.volumeButtons)}
                />
            </Section>

            <Section title="Translating">
                <SectionItem
                    onPress={() => navigation.navigate("SelectSettings", {
                        title: "Translating engine",
                        description: "Select the translation engine to use for translating text in your books. More engines may be added in the future.",
                        labels: ["Google Translate", "LinguaLib server"],
                        defaultValue: settings.translatingEngine,
                        fieldName: settingsFields.translatingEngine
                    })}
                    text="Translating engine"
                    subtext={`Chosen: ${settings.translatingEngine}`}
                />
                <SectionItem
                    onPress={() => navigation.navigate("SelectSettings", {
                        title: "Target language",
                        description: "Select the language into which your books will be translated. Please note that this list may differ from one translation engine to another.",
                        labels: ["Ukrainian", "English"],
                        defaultValue: settings.targetLanguage,
                        fieldName: settingsFields.targetLanguage
                    })}
                    text="Target language"
                    subtext={`Chosen: ${settings.targetLanguage}`}
                />
                <SectionItemWithSwitch
                    defaultValue={settings.backup}
                    text="Backup"
                    subtext="By default, the original text in your books is replaced by the translated text. Turn this option on to make a backup copy of the original book."
                    onChange={handleOnChange(settingsFields.backup)}
                />
            </Section>

            <Section title="Other">
                <SectionItem
                    onPress={() => navigation.navigate("SelectSettings", {
                        title: "Language",
                        description: "Select the interface language. Please note that this option is not relevant for the translation language. To change the translation language, go to Settings, Translation section",
                        labels: ["English", "Ukrainian"],
                        defaultValue: settings.language,
                        fieldName: settingsFields.language
                    })}
                    text="Target language"
                    subtext={`Chosen: ${settings.language}`}
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