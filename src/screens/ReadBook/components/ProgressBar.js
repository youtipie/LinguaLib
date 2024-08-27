import {View, StyleSheet} from "react-native";
import {colors} from "../../../constants/styles";
import {useReader} from "@epubjs-react-native/core";

const ProgressBar = ({containerStyle, sectionsPercentages}) => {
    const {currentLocation, theme} = useReader();

    const currentPercentage = (currentLocation?.start.percentage || 0);
    const currentPercentageString = (currentPercentage * 100).toFixed(0);

    return (
        <View style={[{...styles.wrapper, backgroundColor: theme.body.background}, containerStyle]}>
            <View style={styles.containerOuter}>
                {sectionsPercentages.map((percentage, index) =>
                    <View
                        key={index}
                        style={
                            [styles.sectionMark,
                                {
                                    left: (percentage * 100).toFixed(0) + "%",
                                    backgroundColor: percentage > currentPercentage ? colors.textAccent100 + "50" : colors.textAccent100
                                }
                            ]
                        }></View>
                )}
                <View
                    style={{...styles.containerInner, width: currentPercentageString + "%"}}
                >
                </View>
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
        height: 2,
        backgroundColor: colors.textAccent100 + "50",
    },
    containerInner: {
        height: "100%",
        backgroundColor: colors.textAccent100,
        overflow: "hidden",
    },
    sectionMark: {
        position: "absolute",
        width: 1,
        height: 6,
        top: "50%",
        transform: [{translateY: -3}],
    }
});