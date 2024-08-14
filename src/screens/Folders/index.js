import {View, Text, StyleSheet, ScrollView} from "react-native";
import {colors, commonIcons, folderIcons, fonts} from "../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../utils/metrics";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import FolderCard from "./components/FolderCard";
import FolderMenu from "./components/FolderMenu";

const mockFolderData = [
    {id: 1, title: "Default folder", path: "/Downloads", isDefault: true},
    {id: 2, title: "My books", path: "/Books", isDefault: false},
]

const Folders = () => {
    function mockFolderPick() {
        console.log("Add folder");
    }

    return (
        <ScrollView contentContainerStyle={styles.root}>
            {mockFolderData.map((item) => (
                <FolderCard
                    key={item.id}
                    leftIcon={
                        <FontAwesomeIcon
                            icon={item.isDefault ? folderIcons.rootFolder : folderIcons.folder}
                            size={moderateScale(36)}
                            color={colors.textPrimary200}
                        />
                    }
                    content={
                        <View style={styles.textWrapper}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardSubtitle}>{item.path}</Text>
                        </View>
                    }
                    rightIcon={
                        <FolderMenu folderId={item.id}/>
                    }
                />
            ))}

            <FolderCard
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
                onPress={mockFolderPick}
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