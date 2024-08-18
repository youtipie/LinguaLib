import {View, Text, StyleSheet, ScrollView} from "react-native";
import {colors, commonIcons, fonts} from "../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../utils/metrics";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import CardWithIcons from "../../UI/CardWithIcons";
import {mockFolderData} from "../../constants/other";
import {documentDirectory, getContentUriAsync, StorageAccessFramework} from "expo-file-system";
import getFolderName from "../../utils/getFolderName";
import {useState} from "react";
import {nanoid} from "@reduxjs/toolkit";
import FolderCard from "./components/FolderCard";

// TODO: Remove root folder definition or thinks something to replace it.
//  FS cannot get access to /downloads or root folder
const Folders = () => {
    const [folders, setFolders] = useState(mockFolderData);

    async function handleAddFolder() {
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (!permissions.granted) {
            return;
        }

        try {
            const uri = permissions.directoryUri;
            const folderName = getFolderName(uri);
            setFolders(prevState => [...prevState, {
                id: nanoid(),
                title: "",
                path: folderName,
                uri,
                isDefault: false
            }]);
        } catch (err) {
            console.log(err);
        }
    }

    // Order of folders is messed. When using db, it will be fixed
    function handleEditFolder(folderId, newTitle) {
        setFolders(prevState => {
            const editedFolder = {...prevState.find(folder => folder.id === folderId), title: newTitle};
            return [...prevState.filter(folder => folder.id !== folderId), editedFolder];
        });
    }

    function handleDeleteFolder(folderId) {
        setFolders(prevState => prevState.filter(folder => folder.id !== folderId));
    }

    return (
        <ScrollView contentContainerStyle={styles.root}>
            {folders.map((item) => (
                <FolderCard key={item.id} item={item} onEdit={handleEditFolder} onDelete={handleDeleteFolder}/>
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