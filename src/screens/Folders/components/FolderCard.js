import {Pressable, StyleSheet, View} from "react-native";
import {colors} from "../../../constants/styles";
import {moderateScale, verticalScale} from "../../../utils/metrics";

const FolderCard = ({leftIcon, content, rightIcon, onPress}) => {
    const cardContent = (
        <View style={styles.cardContent}>
            <View style={styles.icon}>
                {leftIcon}
            </View>
            {content}
            <View style={styles.icon}>
                {rightIcon}
            </View>
        </View>
    );

    return (
        onPress ?
            <Pressable onPress={onPress} style={styles.folderCard}>
                {cardContent}
            </Pressable>
            :
            <View style={styles.folderCard}>
                {cardContent}
            </View>
    );
};

export default FolderCard;

const styles = StyleSheet.create({
    folderCard: {
        backgroundColor: colors.primary100,
        width: "100%",
        marginVertical: verticalScale(5),
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: moderateScale(10),
    },
    icon: {
        justifyContent: "center",
        width: "10%"
    }
});