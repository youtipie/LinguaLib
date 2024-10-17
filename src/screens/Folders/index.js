import {View, Text, StyleSheet, ScrollView} from "react-native";
import {colors, commonIcons, fonts} from "../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../utils/metrics";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import CardWithIcons from "../../UI/CardWithIcons";
import {StorageAccessFramework} from "expo-file-system";
import FolderCard from "./components/FolderCard";
import {withObservables} from "@nozbe/watermelondb/react";
import FolderDAO from "../../database/DAO/FolderDAO";
import useModal from "../../hooks/useModal";
import {useTranslation} from "react-i18next";


// TODO: Remove root folder definition or thinks something to replace it.
//  FS cannot get access to /downloads or root folder
const Folders = ({folders}) => {
    const {showModal} = useModal()
    const {t} = useTranslation();

    async function handleAddFolder() {
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (!permissions.granted) {
            return;
        }

        try {
            const uri = permissions.directoryUri;
            /*
            Idea:
            User clicks "Add folder"
            -> New folder created with empty name (Not added to db)
            -> User enters title for a folder
            -> folder being added to db
             */
            // TODO: Make idea real or leave as it is
            await FolderDAO.addFolder(t("screens.Folders.newFolderPlaceholder"), uri);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleEditFolder(folder, newTitle) {
        await folder.changeTitle(newTitle);
    }

    async function handleDeleteFolder(folder) {
        const result = await folder.delete();
        if (!result) {
            showModal(
                t("screens.Folders.deleteModal.title"),
                t("screens.Folders.deleteModal.content"),
                t("screens.Folders.deleteModal.leftButtonText"),
                () => {
                },
                t("screens.Folders.deleteModal.rightButtonText"),
                async () => await folder.delete(true),
            );
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.root}>
            {folders.map((folder) => (
                <FolderCard
                    key={folder.id}
                    folder={folder}
                    onEdit={(newTitle) => handleEditFolder(folder, newTitle)}
                    onDelete={() => handleDeleteFolder(folder)}
                />
            ))}

            <CardWithIcons
                leftIcon={
                    <View style={styles.icon}></View>
                }
                content={
                    <Text style={styles.addText}>{t("screens.Folders.addFolder")}</Text>
                }
                rightIcon={
                    <FontAwesomeIcon
                        icon={commonIcons.addCircle}
                        size={moderateScale(20)}
                        color={colors.success200}
                    />
                }
                onPress={handleAddFolder}
            />
        </ScrollView>
    );
};

const enhance = withObservables([], () => ({
    folders: FolderDAO.observeFolders(),
}));

export default enhance(Folders);

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        backgroundColor: colors.primary200,
        paddingHorizontal: moderateScale(15),
        paddingVertical: verticalScale(10),
    },
    textWrapper: {
        marginLeft: horizontalScale(5),
        marginVertical: verticalScale(5),
        flexGrow: 1
    },
    cardTitle: {
        fontSize: moderateScale(24),
        fontFamily: fonts.primaryRegular,
        color: colors.textPrimary200,
        lineHeight: moderateScale(24)
    },
    cardSubtitle: {
        fontFamily: fonts.primaryRegular,
        fontSize: moderateScale(16),
        color: colors.textAccent100,
        lineHeight: moderateScale(16)
    },
    addText: {
        flexGrow: 1,
        textAlign: "center",
        fontFamily: fonts.primaryRegular,
        fontSize: moderateScale(20),
        color: colors.textPrimary200,
        marginVertical: verticalScale(-5),
    },
    icon: {
        alignItems: "center",
        width: "10%",
    },
});