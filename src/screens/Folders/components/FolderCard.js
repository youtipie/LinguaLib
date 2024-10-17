import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {colors, commonIcons, folderIcons, fonts} from "../../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../../utils/metrics";
import {Pressable, StyleSheet, Text, View} from "react-native";
import FolderMenu from "./FolderMenu";
import CardWithIcons from "../../../UI/CardWithIcons";
import InputField from "../../../UI/InputField";
import useModal from "../../../hooks/useModal";
import {withObservables} from "@nozbe/watermelondb/react";
import {useTranslation} from "react-i18next";

const FolderCard = ({folder, onEdit, onDelete}) => {
    const [title, setTitle] = useState(folder.title);
    const [isEditing, setEditing] = useState(folder.title.length === 0);
    const {showModal} = useModal();
    const {t} = useTranslation();

    function toggleEdit() {
        setEditing(prev => !prev);
    }

    function handleEdit(value) {
        setTitle(value);
    }

    function handleSubmit() {
        if (title.length) {
            onEdit(title);
            toggleEdit();
            return;
        }

        showModal(
            t("screens.Folders.noteModal.title"),
            t("screens.Folders.noteModal.content"),
            t("screens.Folders.noteModal.leftButtonText"),
            onDelete,
            t("screens.Folders.noteModal.rightButtonText"),
        );
    }

    return (
        <CardWithIcons
            leftIcon={
                <FontAwesomeIcon
                    icon={folder.isDefault ? folderIcons.rootFolder : folderIcons.folder}
                    size={moderateScale(36)}
                    color={colors.textPrimary200}
                />
            }
            content={
                <View style={styles.textWrapper}>
                    {
                        isEditing ?
                            <InputField
                                inputStyles={{...styles.cardTitle, ...styles.inputText}}
                                wrapperStyles={styles.inputWrapper}
                                defaultValue={title}
                                onChangeText={handleEdit}
                                autoFocus={true}
                                placeholder={t("screens.Folders.newFolderPlaceholder")}
                            />
                            :
                            <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode={"middle"}>{title}</Text>
                    }
                    <Text style={styles.cardSubtitle} numberOfLines={1} ellipsizeMode={"middle"}>{folder.path}</Text>
                </View>
            }
            rightIcon={
                isEditing ?
                    <Pressable onPress={handleSubmit}>
                        <FontAwesomeIcon
                            icon={commonIcons.check}
                            size={moderateScale(24)}
                            color={colors.textPrimary200}
                        />
                    </Pressable>
                    :
                    <FolderMenu onEdit={toggleEdit} onDelete={onDelete}/>
            }
        />
    );
};

const enhance = withObservables(["folder"], ({folder, onEdit, onDelete}) => ({
    folder: folder
}));

export default enhance(FolderCard);

const styles = StyleSheet.create({
    textWrapper: {
        marginLeft: horizontalScale(5),
        marginVertical: verticalScale(5),
        width: "75%",
    },
    cardTitle: {
        fontSize: moderateScale(24),
        fontFamily: fonts.primaryRegular,
        color: colors.textPrimary200,
        lineHeight: moderateScale(24),
    },
    cardSubtitle: {
        fontFamily: fonts.primaryRegular,
        fontSize: moderateScale(16),
        color: colors.textAccent100,
        lineHeight: moderateScale(16)
    },
    inputText: {
        textAlignVertical: "bottom",
    },
    inputWrapper: {
        width: "90%",
    }
});