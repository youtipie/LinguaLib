import {View, Text, StyleSheet} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import {colors, commonIcons, commonStyles} from "../../../constants/styles";
import {horizontalScale, verticalScale} from "../../../utils/metrics";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

const ReadingOptionSelect = ({options, defaultValue, onValueChange}) => {

    return (
        <SelectDropdown
            data={options}
            onSelect={onValueChange}
            renderButton={(selectedItem, isOpen) => (
                <View style={styles.triggerContainer}>
                    <Text style={commonStyles.readingOptionText}>{selectedItem}</Text>
                    <FontAwesomeIcon
                        icon={commonIcons.optionsDown}
                        size={commonStyles.readingOptionText.fontSize}
                        color={commonStyles.readingOptionText.color}
                    />
                </View>
            )}
            renderItem={(item, index, isSelected) => (
                <View style={styles.item}>
                    <Text style={[commonStyles.readingOptionText, isSelected && styles.selected]}>{item}</Text>
                </View>
            )}
            dropdownStyle={styles.dropdownContainer}
            dropdownOverlayColor="transparent"
            defaultValue={defaultValue}
        />
    );
};

export default ReadingOptionSelect;

const styles = StyleSheet.create({
    dropdownContainer: {
        backgroundColor: colors.primary100,
        paddingHorizontal: horizontalScale(10),
        paddingVertical: verticalScale(5),
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2,},
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    triggerContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    item: {
        marginVertical: verticalScale(2),
        flexDirection: "row",
        alignItems: "center"
    },
    selected: {
        color: colors.success200,
    }
});