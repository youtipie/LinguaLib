import {StyleSheet, View, Text} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {colors, commonIcons, fonts} from "../../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../../utils/metrics";
import MenuWrapper from "../../../components/Menu/MenuWrapper";
import {renderers} from "react-native-popup-menu";
import ReadingOption from "./ReadingOption";
import ReadingOptionSelect from "./ReadingOptionSelect";
import ReadingOptionInput from "./ReadingOptionInput";
import ReadingOptionSwitch from "./ReadingOptionSwitch";
import ReadingOptionSlider from "./ReadingOptionSlider";

export const ReadingOptionTypes = {
    SELECT: 1,
    INPUT: 2,
    SLIDER: 3,
    SWITCH: 4,
}

const ReadingOptionsMenu = () => {
    const options = [
        {
            label: "Color scheme",
            defaultValue: "Sepia",
            onChangeValue: null,
            type: ReadingOptionTypes.SELECT,
            options: ["Day", "Night", "Sepia"]
        },
        {
            label: "Font",
            defaultValue: "Merriweather",
            onChangeValue: null,
            type: ReadingOptionTypes.SELECT,
            options: ["Roboto", "Arial", "Merriweather", "Atyp Dysplay"]
        },
        {label: "Font size", defaultValue: 50, onChangeValue: null, type: ReadingOptionTypes.INPUT, incrementValue: 1},
        {
            label: "Font boldness",
            defaultValue: 300,
            onChangeValue: null,
            type: ReadingOptionTypes.SLIDER,
            min: 100,
            max: 900,
            step: 100
        },
        {
            label: "Text indent",
            defaultValue: 0,
            onChangeValue: null,
            type: ReadingOptionTypes.SLIDER,
            min: 0,
            max: 100,
            step: 1
        },
        {
            label: "Line spacing",
            defaultValue: 110,
            onChangeValue: null,
            type: ReadingOptionTypes.INPUT,
            incrementValue: 10
        },
        {
            label: "Text alignment",
            defaultValue: "Justified",
            onChangeValue: null,
            type: ReadingOptionTypes.SELECT,
            options: ["Left", "Right", "Center", "Justified"]
        },
        {label: "Line breaks", defaultValue: true, onChangeValue: null, type: ReadingOptionTypes.SWITCH},
        {label: "Translation", defaultValue: false, onChangeValue: null, type: ReadingOptionTypes.SWITCH},
    ]

    return (
        <MenuWrapper
            renderer={renderers.Popover}
            rendererProps={{placement: "bottom", anchorStyle: {backgroundColor: "transparent"}}}
            trigger={
                <FontAwesomeIcon
                    icon={commonIcons.options}
                    size={moderateScale(24)}
                    color={colors.textPrimary200}
                />
            }
            options={
                <View style={styles.optionsWrapper}>
                    <Text style={styles.title}>Reading Settings</Text>
                    {options.map((option, index) => {
                        let selectedOption = null;

                        switch (option.type) {
                            case ReadingOptionTypes.SELECT: {
                                selectedOption = <ReadingOptionSelect
                                    options={option.options}
                                    onValueChange={option.onChangeValue}
                                    defaultValue={option.defaultValue}
                                />
                                break;
                            }
                            case ReadingOptionTypes.INPUT: {
                                selectedOption = <ReadingOptionInput
                                    defaultValue={option.defaultValue}
                                    onChangeValue={option.onChangeValue}
                                    incrementValue={option.incrementValue}
                                />
                                break;
                            }
                            case ReadingOptionTypes.SWITCH: {
                                selectedOption = <ReadingOptionSwitch
                                    defaultValue={option.defaultValue}
                                    onChangeValue={option.onChangeValue}
                                />
                                break;
                            }
                            case ReadingOptionTypes.SLIDER: {
                                selectedOption = <ReadingOptionSlider
                                    defaultValue={option.defaultValue}
                                    onChangeValue={option.onChangeValue}
                                    min={option.min}
                                    max={option.max}
                                    step={option.step}
                                />
                                break;
                            }
                        }
                        return (
                            <ReadingOption key={option.label} label={option.label}>
                                {selectedOption}
                            </ReadingOption>
                        )
                    })}
                </View>
            }
            optionsContainerStyle={{
                backgroundColor: colors.menu100,
                paddingBottom: 0,
                // borderRadius: moderateScale(5),
            }}
        />
    );
};

export default ReadingOptionsMenu;

const styles = StyleSheet.create({
    optionsWrapper: {
        paddingHorizontal: horizontalScale(5),
    },
    title: {
        fontSize: moderateScale(16),
        fontFamily: fonts.primaryRegular,
        color: colors.textPrimary100,
        textTransform: "uppercase",
        textAlign: "center",
        marginVertical: verticalScale(5),
    }
});