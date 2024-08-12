import {View, StyleSheet, Text} from "react-native";
import {moderateScale, verticalScale} from "../../../utils/metrics";
import {colors, fonts} from "../../../constants/styles";

const Section = ({title, children}) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );
};

export default Section;

const styles = StyleSheet.create({
    section: {
        width: "100%",
        marginTop: verticalScale(15),
    },
    sectionTitle: {
        fontFamily: fonts.primaryRegular,
        color: colors.textAccent200,
        fontSize: moderateScale(18),
        marginBottom: verticalScale(15),
    },
});