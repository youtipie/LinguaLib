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
import {useDispatch, useSelector} from "react-redux";
import {selectAllReadingSettings, readingSettingsFields, updateReadingSetting} from "../../../store/reducers/settings";
import {colorSchemeOptions, fontOptions, textAlignmentOptions} from "../../../constants/settings";

export const ReadingOptionTypes = {
    SELECT: 1,
    INPUT: 2,
    SLIDER: 3,
    SWITCH: 4,
};

const optionComponents = {
    [ReadingOptionTypes.SELECT]: ReadingOptionSelect,
    [ReadingOptionTypes.INPUT]: ReadingOptionInput,
    [ReadingOptionTypes.SLIDER]: ReadingOptionSlider,
    [ReadingOptionTypes.SWITCH]: ReadingOptionSwitch,
};

const ReadingOptionsMenu = ({onClose}) => {
    const settings = useSelector(selectAllReadingSettings);
    const dispatch = useDispatch();

    const handleOnChange = (fieldName) => (value) => dispatch(updateReadingSetting({value, name: fieldName}));

    const options = [
        {
            label: "Color scheme",
            defaultValue: settings.colorScheme,
            onValueChange: handleOnChange(readingSettingsFields.colorScheme),
            type: ReadingOptionTypes.SELECT,
            options: Object.values(colorSchemeOptions),
        },
        {
            label: "Font",
            defaultValue: settings.font,
            onValueChange: handleOnChange(readingSettingsFields.font),
            type: ReadingOptionTypes.SELECT,
            options: Object.values(fontOptions),
        },
        {
            label: "Font size",
            defaultValue: settings.fontSize,
            onValueChange: handleOnChange(readingSettingsFields.fontSize),
            type: ReadingOptionTypes.INPUT,
            incrementValue: 1,
        },
        {
            label: "Font boldness",
            defaultValue: settings.fontBoldness,
            onValueChange: handleOnChange(readingSettingsFields.fontBoldness),
            type: ReadingOptionTypes.SLIDER,
            min: 100,
            max: 900,
            step: 100,
        },
        {
            label: "Text indent",
            defaultValue: settings.textIndent,
            onValueChange: handleOnChange(readingSettingsFields.textIndent),
            type: ReadingOptionTypes.SLIDER,
            min: 0,
            max: 100,
            step: 1,
        },
        {
            label: "Line spacing",
            defaultValue: settings.lineSpacing,
            onValueChange: handleOnChange(readingSettingsFields.lineSpacing),
            type: ReadingOptionTypes.INPUT,
            incrementValue: 10,
        },
        {
            label: "Text alignment",
            defaultValue: settings.textAlignment,
            onValueChange: handleOnChange(readingSettingsFields.textAlignment),
            type: ReadingOptionTypes.SELECT,
            options: Object.values(textAlignmentOptions),
        },
        {
            label: "Line breaks",
            defaultValue: settings.lineBreaks,
            onValueChange: handleOnChange(readingSettingsFields.lineBreaks),
            type: ReadingOptionTypes.SWITCH,
        },
        {
            label: "Translation",
            defaultValue: settings.translation,
            onValueChange: handleOnChange(readingSettingsFields.translation),
            type: ReadingOptionTypes.SWITCH,
        },
    ];

    const renderOption = (option) => {
        const OptionComponent = optionComponents[option.type];
        return (
            <ReadingOption key={option.label} label={option.label}>
                <OptionComponent {...option} />
            </ReadingOption>
        );
    };

    return (
        <MenuWrapper
            renderer={renderers.Popover}
            rendererProps={{placement: "bottom", anchorStyle: {backgroundColor: "transparent"}}}
            onClose={onClose}
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
                    {options.map(renderOption)}
                </View>
            }
            optionsContainerStyle={{
                backgroundColor: colors.menu100,
                paddingBottom: 0,
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
    },
});
