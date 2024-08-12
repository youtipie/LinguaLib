import {StyleSheet, Text, View} from "react-native";
import {colors, fonts} from "../../constants/styles";
import {moderateScale, verticalScale} from "../../utils/metrics";
import {useLayoutEffect} from "react";
import RadioButtonGroup from "../../components/RadioButtonGroup";

const SelectSettings = ({navigation, route}) => {
    const {title, description, labels, defaultValue} = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
        });
    }, [navigation]);

    // TODO: Think of a way to change value in a store
    function mockValueChanged(value) {
        console.log(value)
    }

    return (
        <View style={styles.root}>
            <Text style={styles.description}>{description}</Text>
            <RadioButtonGroup
                labels={labels}
                defaultValue={defaultValue}
                onValueChange={mockValueChanged}
            />
        </View>
    );
};

export default SelectSettings;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.primary200,
        padding: moderateScale(15),
    },
    description: {
        fontFamily: fonts.primaryRegular,
        fontSize: moderateScale(18),
        color: colors.textPrimary200,
        marginBottom: verticalScale(30),
    },

});