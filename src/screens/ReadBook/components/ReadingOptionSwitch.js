import {View, StyleSheet, Text} from "react-native";
import SwitchButton from "../../../UI/SwitchButton";
import {commonStyles} from "../../../constants/styles";

const ReadingOptionSwitch = ({defaultValue, onChangeValue}) => {

    return (
        <View style={styles.container}>
            <Text style={commonStyles.readingOptionText}>Enabled</Text>
            <SwitchButton defaultValue={defaultValue} onChange={onChangeValue}/>
        </View>
    );
};

export default ReadingOptionSwitch;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});