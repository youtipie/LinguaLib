import SelectDropdown from 'react-native-select-dropdown';
import {View, StyleSheet, Text} from "react-native";
import {colors, commonIcons, commonStyles, folderIcons} from "../../../constants/styles";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {horizontalScale, moderateScale, verticalScale} from "../../../utils/metrics";
import {withObservables} from "@nozbe/watermelondb/react";
import FolderDAO from "../../../database/DAO/FolderDAO";
import getAbsolutePath from "../../../utils/getAbsolutePath";


const FolderSelect = ({onSelect, defaultValue, folders}) => {
    const defaultValueData = {id: defaultValue.id, title: defaultValue.title, uri: defaultValue.uri};
    const foldersData = folders.map(folder => ({id: folder.id, title: folder.title, uri: folder.uri}))

    return (
        <SelectDropdown
            data={foldersData}
            onSelect={(selectedItem) => onSelect(selectedItem)}
            renderButton={(selectedItem, isOpen) => {
                return (
                    <View style={styles.triggerButton}>
                        <Text style={commonStyles.detailText}>
                            {(selectedItem && selectedItem.title) || defaultValueData.title}
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
                            style={[commonStyles.detailText, (isSelected && {color: colors.success200})]}>{item.title} ({getAbsolutePath(item.uri)})</Text>
                    </View>
                );
            }}
            dropdownStyle={styles.dropdownMenu}
            dropdownOverlayColor={"transparent"}
            defaultValue={defaultValueData}
        />
    );
};

const enhance = withObservables([], ({onSelect, defaultValue}) => ({
    folders: FolderDAO.observeFolders()
}));

export default enhance(FolderSelect);

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