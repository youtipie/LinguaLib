import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {colors, drawerIcons, fonts} from "../../../constants/styles";
import {useReader} from "@epubjs-react-native/core";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {horizontalScale, moderateScale, verticalScale} from "../../../utils/metrics";
import {useNavigation} from "@react-navigation/native";
import ReadingOptionsMenu from "./ReadingOptionsMenu";

const Header = ({bookTitle, onSettingsClose}) => {
    const {section, currentLocation} = useReader();
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <TouchableOpacity onPress={handleGoBack}>
                    <FontAwesomeIcon icon={drawerIcons.goBack} size={moderateScale(24)} color={colors.textPrimary200}/>
                </TouchableOpacity>
                <ReadingOptionsMenu onClose={onSettingsClose}/>
            </View>
            <View style={styles.lowerContainer}>
                <Text style={styles.title}>{bookTitle}</Text>
                {section &&
                    <Text
                        style={styles.subtitle}>{section.label.trim()} - {currentLocation.start.displayed.page}/{currentLocation.start.displayed.total}</Text>}
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        paddingHorizontal: horizontalScale(15),
        backgroundColor: colors.primary200,
        zIndex: 1000
    },
    upperContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: verticalScale(10),
        borderBottomWidth: 1,
        borderBottomColor: colors.textAccent100,
    },
    lowerContainer: {
        paddingVertical: verticalScale(10),
    },
    title: {
        fontFamily: fonts.primaryRegular,
        fontSize: moderateScale(16),
        color: colors.textPrimary200,
    },
    subtitle: {
        fontFamily: fonts.primaryRegular,
        fontSize: moderateScale(14),
        color: colors.textAccent100,
    }
});