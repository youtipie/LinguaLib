import {TextInput, StyleSheet, View} from "react-native";
import {colors, fonts} from "../constants/styles";
import {moderateScale} from "../utils/metrics";

const InputField = ({defaultValue, onChangeText}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter title"
                defaultValue={defaultValue}
                onChangeText={onChangeText}
                underlineColorAndroid="transparent"
                cursorColor={colors.primary300}
                placeholderTextColor={colors.primary300}
                autoFocus
            />
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.success100,
        fontFamily: fonts.primaryRegular,
        fontSize: moderateScale(20),
        color: colors.textPrimary100,
    }
});