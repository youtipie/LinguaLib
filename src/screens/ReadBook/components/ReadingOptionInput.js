import {useState} from "react";
import {TouchableOpacity, View, StyleSheet} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import InputField from "../../../UI/InputField";
import {colors, commonIcons, commonStyles} from "../../../constants/styles";
import {horizontalScale, moderateScale} from "../../../utils/metrics";

const ReadingOptionInput = ({defaultValue, incrementValue, onValueChange}) => {
    const [value, setValue] = useState(defaultValue.toString());

    function handleValueChange(inputValue) {
        let sanitizedValue = inputValue.replace(/[^0-9]/g, "");

        if (parseInt(sanitizedValue) < 1 || !sanitizedValue) {
            sanitizedValue = "1";
        }

        setValue(sanitizedValue);
        onValueChange(parseInt(sanitizedValue));
    }

    function handleIconsPress(incrementValue) {
        const intValue = parseInt(value);
        const newValue = Math.max(intValue + incrementValue, 1);
        setValue(newValue.toString());
        onValueChange(newValue)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleIconsPress(-incrementValue)}>
                <FontAwesomeIcon
                    icon={commonIcons.minusCircle}
                    color={commonStyles.readingOptionText.color}
                    size={commonStyles.readingOptionText.fontSize}
                />
            </TouchableOpacity>
            <InputField
                multiline={false}
                autoFocus={false}
                maxLength={3}
                value={value}
                onChangeText={handleValueChange}
                keyboardType={"numeric"}
                wrapperStyles={styles.inputWrapper}
                inputStyles={styles.input}
            />
            <TouchableOpacity onPress={() => handleIconsPress(incrementValue)}>
                <FontAwesomeIcon
                    icon={commonIcons.addCircle}
                    color={commonStyles.readingOptionText.color}
                    size={commonStyles.readingOptionText.fontSize}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ReadingOptionInput;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    inputWrapper: {
        width: "30%",
        paddingBottom: moderateScale(5),
    },
    input: {
        borderColor: colors.textAccent100,
        textAlign: "center",
        ...commonStyles.readingOptionText
    }
});