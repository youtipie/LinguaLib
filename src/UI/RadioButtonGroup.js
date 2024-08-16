import {useState} from "react";
import {StyleSheet} from "react-native";
import RadioButton from "./RadioButton";
import {horizontalScale} from "../utils/metrics";

const RadioButtonGroup = ({labels, defaultValue, onValueChange}) => {
    const [value, setValue] = useState(defaultValue);

    function handleValueChange(newValue) {
        setValue(newValue);
        onValueChange(newValue);
    }

    return (
        <>
            {labels.map(label => (
                <RadioButton
                    key={label}
                    style={styles.button}
                    label={label}
                    isSelected={label === value}
                    onSelect={() => handleValueChange(label)}
                />
            ))}
        </>
    );
};

export default RadioButtonGroup;

const styles = StyleSheet.create({
    button: {
        marginBottom: horizontalScale(15),
    }
});