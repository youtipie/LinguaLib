import {Text, View, StyleSheet} from "react-native";
import SwitchButton from "../../../UI/SwitchButton";
import {colors, fonts} from "../../../constants/styles";
import {moderateScale, verticalScale} from "../../../utils/metrics";

const SectionItemWithSwitch = ({text, subtext, onChange, defaultValue}) => {
    return (
        <View style={styles.sectionItem}>
            <View style={styles.sectionItemTextWrapper}>
                {text && <Text style={styles.sectionText}>{text}</Text>}
                {subtext && <Text style={styles.sectionSubText}>{subtext}</Text>}
            </View>
            <SwitchButton style={styles.button} defaultValue={defaultValue} onChange={onChange}/>
        </View>
    );
};

export default SectionItemWithSwitch;

const styles = StyleSheet.create({
    sectionItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(5),
    },
    sectionText: {
        fontFamily: fonts.primaryRegular,
        color: colors.textPrimary200,
        fontSize: moderateScale(16)
    },
    sectionSubText: {
        fontFamily: fonts.primaryRegular,
        color: colors.textAccent100,
        fontSize: moderateScale(12)
    },
    sectionItemTextWrapper: {
        width: "90%"
    },
    button: {
        marginLeft: "auto"
    }
});