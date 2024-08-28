import {View, StyleSheet} from "react-native";
import {Slider} from "@miblanchard/react-native-slider";
import {colors} from "../../../constants/styles";
import {useDebounceCallback} from "usehooks-ts";

const ReadingOptionSlider = ({defaultValue, onValueChange, min, max, step}) => {
    const debounced = useDebounceCallback((percentage) => {
        onValueChange(percentage[0]);
    });

    return (
        <View style={styles.container}>
            <Slider
                minimumValue={min}
                maximumValue={max}
                step={step}
                value={defaultValue}
                onValueChange={debounced}
                minimumTrackTintColor={colors.textAccent100}
                maximumTrackTintColor={colors.textAccent100 + "50"}
                thumbTintColor={colors.textAccent100}
                thumbStyle={{width: 10, height: 10}}
                containerStyle={{width: "100%"}}
            />
        </View>
    );
};

export default ReadingOptionSlider;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});