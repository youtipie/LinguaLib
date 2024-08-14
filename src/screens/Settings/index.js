import {useCallback} from "react";
import {StyleSheet, ScrollView, Linking, Alert} from "react-native";
import {colors} from "../../constants/styles";
import {moderateScale} from "../../utils/metrics";
import {buyMeACoffeeUrl} from "../../constants/other";
import Section from "./compontens/Section";
import SectionItemWithSwitch from "./compontens/SectionItemWithSwitch";
import SectionItem from "./compontens/SectionItem";

const Settings = ({navigation}) => {
    const visitSupportPage = useCallback(async () => {
        const supported = await Linking.canOpenURL(buyMeACoffeeUrl);

        if (supported) {
            await Linking.openURL(buyMeACoffeeUrl);
        } else {
            Alert.alert(`Don't know how to open this URL: ${buyMeACoffeeUrl}`);
        }
    }, [buyMeACoffeeUrl]);

    function mockChange(value) {
        console.log(value)
    }

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Section title="General">
                <SectionItemWithSwitch
                    defaultValue={false}
                    text="Open book on start up"
                    subtext="Continue reading the book when the app starts"
                    onChange={mockChange}
                />
            </Section>

            <Section title="Reading">
                <SectionItemWithSwitch
                    defaultValue={false}
                    text="Full screen mode"
                    subtext="Hide navigation panel and status bar"
                    onChange={mockChange}
                />
                <SectionItemWithSwitch
                    defaultValue={false}
                    text="Screen shutdown delay"
                    subtext="Leave the screen on for a longer period than the average use of a phone"
                    onChange={mockChange}
                />
                <SectionItemWithSwitch
                    defaultValue={false}
                    text="Animations"
                    subtext="Show the animations when changing pages"
                    onChange={mockChange}
                />
                <SectionItemWithSwitch
                    defaultValue={false}
                    text="Volume buttons"
                    subtext="Use the volume buttons to turn pages. Volume down - previous page, volume up - next page"
                    onChange={mockChange}
                />
            </Section>

            <Section title="Translating">
                <SectionItem
                    onPress={() => navigation.navigate("SelectSettings", {
                        title: "Translating engine",
                        description: "Select the translation engine to use for translating text in your books. More engines may be added in the future.",
                        labels: ["Google translate", "LinguaLib server"],
                        defaultValue: "Google translate",
                    })}
                    text="Translating engine"
                    subtext="Chosen: Google Translate"
                />
                <SectionItem
                    onPress={() => navigation.navigate("SelectSettings", {
                        title: "Target language",
                        description: "Select the language into which your books will be translated. Please note that this list may differ from one translation engine to another.",
                        labels: ["Ukrainian", "English"],
                        defaultValue: "Ukrainian",
                    })}
                    text="Target language"
                    subtext="Chosen: Ukrainian"
                />
                <SectionItemWithSwitch
                    defaultValue={false}
                    text="Backup"
                    subtext="By default, the original text in your books is replaced by the translated text. Turn this option on to make a backup copy of the original book."
                    onChange={mockChange}
                />
            </Section>

            <Section title="Other">
                <SectionItem
                    onPress={() => navigation.navigate("SelectSettings", {
                        title: "Language",
                        description: "Select the interface language. Please note that this option is not relevant for the translation language. To change the translation language, go to Settings, Translation section",
                        labels: ["English", "Ukrainian"],
                        defaultValue: "English",
                    })}
                    text="Target language"
                    subtext="Chosen: Ukrainian"
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