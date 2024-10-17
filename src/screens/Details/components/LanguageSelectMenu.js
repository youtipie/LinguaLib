import {useState} from "react";
import {FlatList, Text, View} from "react-native";
import {renderers,} from "react-native-popup-menu";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import MenuWrapper from "../../../components/Menu/MenuWrapper";
import {colors, commonIcons, commonStyles} from "../../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../../utils/metrics";
import MenuItem from "../../../components/Menu/MenuItem";
import DetailsItem from "./DetailsItem";
import {languageIconList} from "../../../utils/languageManager";
import {useTranslation} from "react-i18next";


const LanguageSelectMenu = ({defaultValue, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue || t("screens.Details.selectLang"));
    const {t} = useTranslation();

    function handleSelectOption(option) {
        setSelectedValue(option.language)
        onSelect(option.language);
    }

    const options = <FlatList data={languageIconList} keyExtractor={(item, index) => index} renderItem={
        (optionData) => <MenuItem
            label={optionData.item.language}
            onSelect={() => handleSelectOption(optionData.item)}
            customIcon={<Text>{optionData.item.icon}</Text>}
            disabled={optionData.item.lang === selectedValue}
        />
    }/>

    return (
        <MenuWrapper
            renderer={renderers.SlideInMenu}
            toggleIsOpen={() => setIsOpen(prevState => !prevState)}
            trigger={
                <DetailsItem title={t("screens.Details.fields.language")}>
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
            options={options}
            optionsContainerStyle={{backgroundColor: colors.primary100, height: verticalScale(600)}}
        />
    );
};

export default LanguageSelectMenu;