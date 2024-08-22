import {useEffect, useState} from "react";
import {ActivityIndicator, View, StyleSheet, Text, Dimensions, BackHandler} from "react-native";
import {colors, fonts} from "../constants/styles";
import {moderateScale} from "../utils/metrics";

const LoadingSpinner = ({label, progressText, onDiscard}) => {
    const [spinnerHeight, setSpinnerHeight] = useState(0);

    useEffect(() => {
        if (onDiscard) {
            const backListener = BackHandler.addEventListener("hardwareBackPress", () => {
                onDiscard();
                return true;
            })

            return () => backListener.remove();
        }
    }, [onDiscard]);

    return (
        <View style={styles.spinnerContainer}>
            <View style={styles.spinnerWrapper}>
                <ActivityIndicator
                    size="large"
                    color={colors.textAccent200}
                    onLayout={(event) => {
                        const {height} = event.nativeEvent.layout;
                        setSpinnerHeight(height);
                    }}
                />
                <View style={[styles.textWrapper, {top: spinnerHeight}]}>
                    <Text style={[styles.text, styles.progressText]}>{progressText}</Text>
                    <Text style={[styles.text, styles.labelText]}>{label}</Text>
                </View>
            </View>
        </View>
    );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
    spinnerContainer: {
        position: "absolute",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    spinnerWrapper: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "15%",
    },
    textWrapper: {
        position: "absolute",
    },
    text: {
        fontFamily: fonts.primaryRegular,
        textAlign: "center",
    },
    labelText: {
        color: colors.textAccent100,
        fontSize: moderateScale(12),
    },
    progressText: {
        color: colors.textPrimary200,
        fontSize: moderateScale(18)
    }
});
