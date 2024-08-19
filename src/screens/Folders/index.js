import {View, Text, StyleSheet, ScrollView, Alert} from "react-native";
import {colors, commonIcons, fonts} from "../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../utils/metrics";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import CardWithIcons from "../../UI/CardWithIcons";
import {StorageAccessFramework} from "expo-file-system";
import {useEffect, useState} from "react";
import FolderCard from "./components/FolderCard";
import database from "../../database";
import {addFolder} from "../../database/queries";
import UseGetMetadataFromDirectory from "../../hooks/UseGetMetadataFromDirectory";

const folderCollection = database.get('folders');

// TODO: Remove root folder definition or thinks something to replace it.
//  FS cannot get access to /downloads or root folder
const Folders = () => {
    const [folders, setFolders] = useState([]);
    const {getMetadataFromDirectory} = UseGetMetadataFromDirectory();

    useEffect(() => {
        const subscription = folderCollection
            .query()
            .observe()
            .subscribe(folders => {
                setFolders(folders);
            });

        return () => subscription.unsubscribe();
    }, []);

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
            await addFolder("New Folder", uri);
            const files = await getMetadataFromDirectory(uri);
            Alert.alert("Alert", JSON.stringify(files.map(file => file.title)));
        } catch (err) {
            console.log(err);
        }
    }

    async function handleEditFolder(folder, newTitle) {
        await folder.changeTitle(newTitle);
    }

    async function handleDeleteFolder(folder) {
        await folder.delete()
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
                    <Text style={styles.addText}>Add folder</Text>
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

export default Folders;

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