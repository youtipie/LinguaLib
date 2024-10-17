import {View, StyleSheet, Text, ScrollView} from "react-native";
import {colors, fonts} from "../constants/styles";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBullseye, faCircleInfo, faClipboardList} from "@fortawesome/free-solid-svg-icons";
import {horizontalScale, moderateScale, verticalScale} from "../utils/metrics";
import {useTranslation} from "react-i18next";

const About = () => {
    const {t} = useTranslation();

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <View style={styles.section}>
                <View style={styles.titleWrapper}>
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        size={moderateScale(18)}
                        color={colors.success100}
                        style={styles.icon}
                    />
                    <Text style={[styles.text, styles.title]}>{t("screens.About.welcome")}</Text>
                </View>
                <Text style={styles.text}>{t("screens.About.welcomeText")}</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.titleWrapper}>
                    <FontAwesomeIcon
                        icon={faBullseye}
                        size={moderateScale(18)}
                        color={colors.success100}
                        style={styles.icon}
                    />
                    <Text style={[styles.text, styles.title]}>{t("screens.About.mission")}</Text>
                </View>
                <Text style={styles.text}>{t("screens.About.missionText")}</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.titleWrapper}>
                    <FontAwesomeIcon
                        icon={faClipboardList}
                        size={moderateScale(18)}
                        color={colors.success100}
                        style={styles.icon}
                    />
                    <Text style={[styles.text, styles.title]}>{t("screens.About.how")}</Text>
                </View>
                <Text style={styles.text}>{t("screens.About.howText")} </Text>
            </View>
        </ScrollView>
    );
};

export default About;

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        backgroundColor: colors.primary200,
        padding: moderateScale(15),
    },
    titleWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(10),
    },
    icon: {
        marginRight: horizontalScale(5),
    },
    text: {
        fontSize: moderateScale(16),
        fontFamily: fonts.primaryRegular,
        color: colors.textPrimary200,
    },
    title: {
        color: colors.success100,
    },
    section: {
        marginBottom: verticalScale(15),
    },
});