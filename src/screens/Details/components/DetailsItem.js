import {StyleSheet, Text, View} from "react-native";
import {colors, commonStyles, fonts} from "../../../constants/styles";
import {moderateScale, verticalScale} from "../../../utils/metrics";

const DetailsItem = ({title, content, children}) => {
    return (
        <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>{title}</Text>
            {
                !children ?
                    <Text style={commonStyles.detailText}>{content}</Text>
                    :
                    children
            }
        </View>
    );
};

export default DetailsItem;

const styles = StyleSheet.create({
    detailItem: {
        marginVertical: verticalScale(5),
    },
    detailTitle: {
        fontFamily: fonts.primaryRegular,
        fontSize: moderateScale(10),
        color: colors.textAccent100,
    },
});