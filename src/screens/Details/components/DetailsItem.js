import {StyleSheet, Text, View} from "react-native";
import {colors, commonStyles, fonts} from "../../../constants/styles";
import {moderateScale, verticalScale} from "../../../utils/metrics";
import InputField from "../../../UI/InputField";

const DetailsItem = ({title, content, children, isEditing, defaultValue, onChangeText}) => {
    let itemContent = <Text style={commonStyles.detailText}>{content}</Text>;

    if (children) {
        itemContent = children;
    }

    if (defaultValue && onChangeText && isEditing) {
        itemContent = (
            <InputField
                inputStyles={commonStyles.detailText}
                placeholder="Enter text"
                defaultValue={defaultValue}
                onChangeText={onChangeText}
                multiline={true}
            />
        )
    }

    return (
        <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>{title}</Text>
            {itemContent}
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