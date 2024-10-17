import {View, StyleSheet, Text} from "react-native";
import SwitchButton from "../../../UI/SwitchButton";
import {commonStyles} from "../../../constants/styles";
import {useTranslation} from "react-i18next";

const ReadingOptionSwitch = ({defaultValue, onValueChange}) => {
    const {t} = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={commonStyles.readingOptionText}>{t("screens.Reading.enabledSwitch")}</Text>
            <SwitchButton defaultValue={defaultValue} onChange={onValueChange}/>
        </View>
    );
};

export default ReadingOptionSwitch;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});