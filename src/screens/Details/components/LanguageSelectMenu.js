import MenuWrapper from "../../../components/Menu/MenuWrapper";
import {colors, commonIcons, commonStyles} from "../../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../../utils/metrics";
import countryFlagEmoji from "country-flag-emoji";
import MenuItem from "../../../components/Menu/MenuItem";
import {Text, View} from "react-native";
import {renderers,} from "react-native-popup-menu";
import DetailsItem from "./DetailsItem";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useState} from "react";

const countryLanguage = require('country-language');

// TODO: Find good way of getting languages and their flag icons
const options = countryFlagEmoji.list.reduce((results, country) => {
    const lang = countryLanguage.getCountry(country.code).langCultureMs?.[0]?.displayName?.split(" ")[0];
    if (lang) {
        results.push({language: lang, icon: country.emoji});
    }
    return results;
}, []);

const LanguageSelectMenu = ({defaultValue, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <MenuWrapper
            renderer={renderers.SlideInMenu}
            toggleIsOpen={() => setIsOpen(prevState => !prevState)}
            trigger={
                <DetailsItem title="Original language">
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={[commonStyles.detailText, {marginRight: horizontalScale(5)}]}>{defaultValue}</Text>
                        <FontAwesomeIcon
                            icon={isOpen ? commonIcons.optionsUp : commonIcons.optionsDown}
                            size={moderateScale(16)}
                            color={colors.textPrimary200}
                        />
                    </View>
                </DetailsItem>
            }
            options={options}
            menuItem={(option, index) => (
                <MenuItem
                    key={index}
                    label={option.language}
                    onSelect={() => onSelect(option.language)}
                    customIcon={<Text>{option.icon}</Text>}
                    disabled={option.lang === defaultValue}
                />
            )}
            optionsContainerStyle={{backgroundColor: colors.primary100, height: verticalScale(600)}}

        />
    );
};

export default LanguageSelectMenu;