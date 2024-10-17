import {useState} from "react";
import {FlatList, StyleSheet} from "react-native";
import RadioButton from "./RadioButton";
import {horizontalScale} from "../utils/metrics";

const RadioButtonGroup = ({data, defaultValue, onValueChange}) => {
    const [value, setValue] = useState(defaultValue);

    function handleValueChange(newValue) {
        setValue(newValue);
        onValueChange(newValue);
    }

    return (
        <FlatList data={data} keyExtractor={(item, index) => index} renderItem={
            (itemData) => <RadioButton
                style={styles.button}
                label={itemData.item[1]}
                isSelected={itemData.item[0] === value}
                onSelect={() => handleValueChange(itemData.item[0])}
            />
        }/>
    );
};

export default RadioButtonGroup;

const styles = StyleSheet.create({
    button: {
        marginBottom: horizontalScale(15),
    }
});