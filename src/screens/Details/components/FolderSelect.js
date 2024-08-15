import SelectDropdown from 'react-native-select-dropdown';
import {View, StyleSheet, Text} from "react-native";
import {colors, commonIcons, commonStyles, folderIcons} from "../../../constants/styles";
import {mockFolderData} from "../../../constants/other";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {horizontalScale, moderateScale, verticalScale} from "../../../utils/metrics";


const FolderSelect = ({onSelect, defaultValue}) => {
    return (
        <SelectDropdown
            data={mockFolderData}
            onSelect={(selectedItem) => onSelect(selectedItem)}
            renderButton={(selectedItem, isOpen) => {
                return (
                    <View style={styles.triggerButton}>
                        <Text style={commonStyles.detailText}>
                            {(selectedItem && selectedItem.title) || defaultValue.title}
                        </Text>
                        <FontAwesomeIcon
                            style={styles.caretIcon}
                            icon={isOpen ? commonIcons.optionsUp : commonIcons.optionsDown}
                            size={moderateScale(16)}
                            color={colors.textPrimary200}
                        />
                    </View>
                )
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View style={styles.item}>
                        <FontAwesomeIcon
                            style={styles.itemIcon}
                            icon={item.isDefault ? folderIcons.rootFolder : folderIcons.folder}
                            size={moderateScale(16)}
                            color={isSelected ? colors.success200 : colors.textPrimary200}
                        />
                        <Text
                            style={[commonStyles.detailText, (isSelected && {color: colors.success200})]}>{item.title} ({item.path})</Text>
                    </View>
                );
            }}
            dropdownStyle={styles.dropdownMenu}
            dropdownOverlayColor={"transparent"}
            defaultValue={defaultValue}
        />
    );
};

export default FolderSelect;

const styles = StyleSheet.create({
    triggerButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    caretIcon: {
        marginLeft: horizontalScale(5)
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: verticalScale(5),
    },
    itemIcon: {
        marginRight: horizontalScale(5)
    },
    dropdownMenu: {
        width: horizontalScale(200),
        backgroundColor: colors.primary100,
        paddingHorizontal: horizontalScale(10),
        paddingVertical: verticalScale(5),
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2,},
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});