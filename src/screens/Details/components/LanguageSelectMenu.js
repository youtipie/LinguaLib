import {useState} from "react";
import {Text, View} from "react-native";
import {renderers,} from "react-native-popup-menu";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import MenuWrapper from "../../../components/Menu/MenuWrapper";
import {colors, commonIcons, commonStyles} from "../../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../../utils/metrics";
import MenuItem from "../../../components/Menu/MenuItem";
import DetailsItem from "./DetailsItem";
import {languageIconList} from "../../../utils/languageManager";


const LanguageSelectMenu = ({defaultValue, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue || "Select language");

    function handleSelectOption(option) {
        setSelectedValue(option.language)
        onSelect(option.language);
    }

    return (
        <MenuWrapper
            renderer={renderers.SlideInMenu}
            toggleIsOpen={() => setIsOpen(prevState => !prevState)}
            trigger={
                <DetailsItem title="Original language">
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text
                            style={[commonStyles.detailText, {marginRight: horizontalScale(5)}]}>{selectedValue}</Text>
                        <FontAwesomeIcon
                            icon={isOpen ? commonIcons.optionsUp : commonIcons.optionsDown}
                            size={moderateScale(16)}
                            color={colors.textPrimary200}
                        />
                    </View>
                </DetailsItem>
            }
            options={languageIconList}
            menuItem={(option, index) => (
                <MenuItem
                    key={index}
                    label={option.language}
                    onSelect={() => handleSelectOption(option)}
                    customIcon={<Text>{option.icon}</Text>}
                    disabled={option.lang === selectedValue}
                />
            )}
            optionsContainerStyle={{backgroundColor: colors.primary100, height: verticalScale(600)}}

        />
    );
};

export default LanguageSelectMenu;