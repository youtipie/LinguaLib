import {TextInput, StyleSheet, View} from "react-native";
import {colors, fonts} from "../constants/styles";
import {moderateScale} from "../utils/metrics";

const InputField = ({
                        placeholder,
                        value,
                        defaultValue,
                        onChangeText,
                        maxLength,
                        inputStyles,
                        wrapperStyles,
                        keyboardType = "default",
                        multiline = false,
                        autoFocus = false
                    }) => {
    return (
        <View style={[styles.container, wrapperStyles]}>
            <TextInput
                style={[styles.input, inputStyles]}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChangeText={onChangeText}
                maxLength={maxLength}
                underlineColorAndroid="transparent"
                cursorColor={colors.primary300}
                placeholderTextColor={colors.primary300}
                autoFocus={autoFocus}
                multiline={multiline}
                keyboardType={keyboardType}
            />
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    container: {
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