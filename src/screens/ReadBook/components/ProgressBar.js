import {View, StyleSheet} from "react-native";
import {colors} from "../../../constants/styles";
import {useReader} from "@epubjs-react-native/core";
import {useDebounceCallback} from "usehooks-ts";
import {Slider} from "@miblanchard/react-native-slider";

const ProgressBar = ({containerStyle, sectionsPercentages, totalPages, progress, onPageChange, isDisabled = true}) => {
    const {theme, injectJavascript} = useReader();

    const debounced = useDebounceCallback((percentage) => {
        injectJavascript(`
      try {
        const cfi = book.locations.cfiFromPercentage(${percentage});
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: "changeLocationCfi", result: cfi }));
      } catch (error) {
        error("Encountered some error while changing pages with slider: " + error);
      }
    `);
        onPageChange(parseInt((percentage * totalPages).toFixed(0)), percentage);
    }, 500);

    const trackStyle = {...styles.trackStyle, ...(!isDisabled && {height: 3})};
    const sectionMarkStyle = {
        ...styles.sectionMark, ...(!isDisabled && {
            width: 2,
            height: 8,
            transform: [{translateY: -4}]
        })
    };

    return (
        <View style={[{
            ...styles.wrapper,
            backgroundColor: isDisabled ? theme.body.background : "transparent"
        }, containerStyle]}>
            <View style={styles.containerOuter}>
                {sectionsPercentages.map((percentage, index) =>
                    <View
                        key={index}
                        style={
                            [sectionMarkStyle,
                                {
                                    left: (percentage * 100).toFixed(0) + "%",
                                    backgroundColor: percentage > progress ? colors.textAccent100 + "50" : colors.textAccent100
                                }
                            ]
                        }></View>
                )}
                <Slider
                    containerStyle={{marginVertical: -15}}
                    trackStyle={trackStyle}
                    thumbStyle={{...{width: 10, height: 10}, ...(isDisabled && {width: 0, height: 0})}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={colors.textAccent100}
                    maximumTrackTintColor={colors.textAccent100 + "50"}
                    thumbTintColor={colors.textAccent100}
                    step={1 / totalPages}
                    value={progress}
                    disabled={isDisabled}
                    onValueChange={(percentage) => debounced(percentage[0])}
                />
            </View>
        </View>
    );
};

export default ProgressBar;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerOuter: {
        width: "100%",
    },
    trackStyle: {
        height: 2
    },
    sectionMark: {
        position: "absolute",
        width: 1,
        height: 6,
        top: "50%",
        transform: [{translateY: -3}],
    }
});