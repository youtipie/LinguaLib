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
import {useTranslation} from "react-i18next";

const Settings = ({navigation}) => {
    const settings = useSelector(selectAllAppSettings);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const visitSupportPage = useCallback(async () => {
        const supported = await Linking.canOpenURL(buyMeACoffeeUrl);

        if (supported) {
            await Linking.openURL(buyMeACoffeeUrl);
        } else {
            Alert.alert(`${t("screens.Settings.urlError")} ${buyMeACoffeeUrl}`);
        }
    }, [buyMeACoffeeUrl]);

    function handleOnChange(fieldName) {
        return (value) => dispatch(updateAppSetting({value, name: fieldName}));
    }

    const targetLanguages = getLanguages(settings.translatingEngine);

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Section title={t("screens.Settings.sections.general.title")}>
                <SectionItemWithSwitch
                    defaultValue={settings.openBookOnStartUp}
                    text={t("screens.Settings.sections.general.openBookOnStartUp.title")}
                    subtext={t("screens.Settings.sections.general.openBookOnStartUp.subtitle")}
                    onChange={handleOnChange(appSettingsFields.openBookOnStartUp)}
                />
            </Section>

            <Section title={t("screens.Settings.sections.reading.title")}>
                <SectionItemWithSwitch
                    defaultValue={settings.fullScreenMode}
                    text={t("screens.Settings.sections.reading.fullScreenMode.title")}
                    subtext={t("screens.Settings.sections.reading.fullScreenMode.subtitle")}
                    onChange={handleOnChange(appSettingsFields.fullScreenMode)}
                />
                <SectionItemWithSwitch
                    defaultValue={settings.screenShutdownDelay}
                    text={t("screens.Settings.sections.reading.screenShutdownDelay.title")}
                    subtext={t("screens.Settings.sections.reading.screenShutdownDelay.subtitle")}
                    onChange={handleOnChange(appSettingsFields.screenShutdownDelay)}
                />
                <SectionItemWithSwitch
                    defaultValue={settings.volumeButtons}
                    text={t("screens.Settings.sections.reading.volumeButtons.title")}
                    subtext={t("screens.Settings.sections.reading.volumeButtons.subtitle")}
                    onChange={handleOnChange(appSettingsFields.volumeButtons)}
                />
            </Section>

            <Section title={t("screens.Settings.sections.translating.title")}>
                <SectionItem
                    onPress={() => navigation.navigate("SelectSettings", {
                        title: t("screens.Settings.sections.translating.translatingEngine.title"),
                        description: t("screens.Settings.sections.translating.translatingEngine.subtitle"),
                        data: Object.values(translatingEngines).reduce((ret, value) => {
                            ret[value] = value;
                            return ret;
                        }, {}),
                        defaultValue: settings.translatingEngine,
                        fieldName: appSettingsFields.translatingEngine
                    })}
                    text={t("screens.Settings.sections.translating.translatingEngine.title")}
                    subtext={`${t("screens.Settings.chosen")}: ${settings.translatingEngine}`}
                />
                <SectionItem
                    onPress={() => navigation.navigate("SelectSettings", {
                        title: t("screens.Settings.sections.translating.targetLanguage.title"),
                        description: t("screens.Settings.sections.translating.targetLanguage.subtitle"),
                        data: targetLanguages,
                        defaultValue: settings.targetLanguage,
                        fieldName: appSettingsFields.targetLanguage
                    })}
                    text={t("screens.Settings.sections.translating.targetLanguage.title")}
                    subtext={`${t("screens.Settings.chosen")}: ${targetLanguages[settings.targetLanguage]}`}
                />
            </Section>

            <Section title={t("screens.Settings.sections.other.title")}>
                <SectionItem
                    onPress={() => navigation.navigate("SelectSettings", {
                        title: t("screens.Settings.sections.other.language.title"),
                        description: t("screens.Settings.sections.other.language.subtitle"),
                        data: UILanguages,
                        defaultValue: settings.language,
                        fieldName: appSettingsFields.language
                    })}
                    text={t("screens.Settings.sections.other.language.title")}
                    subtext={`${t("screens.Settings.chosen")}: ${UILanguages[settings.language]}`}
                />
                <SectionItem
                    onPress={visitSupportPage}
                    text={t("screens.Settings.sections.other.support.title")}
                    subtext={t("screens.Settings.sections.other.support.subtitle")}
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