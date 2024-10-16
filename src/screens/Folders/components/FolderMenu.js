import {colors, commonIcons} from "../../../constants/styles";
import {moderateScale} from "../../../utils/metrics";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import MenuWrapper from "../../../components/Menu/MenuWrapper";
import MenuItem from "../../../components/Menu/MenuItem";
import {useTranslation} from "react-i18next";

const FolderMenu = ({onEdit, onDelete}) => {
    const {t} = useTranslation();

    const options = [
        {icon: commonIcons.editSquare, label: t("screens.Folders.options.rename"), action: onEdit},
        {icon: commonIcons.minusSquare, label: t("screens.Folders.options.remove"), action: onDelete},
    ];

    return (
        <MenuWrapper
            trigger={
                <FontAwesomeIcon
                    icon={commonIcons.dotsHorizontal}
                    size={moderateScale(24)}
                    color={colors.textPrimary200}
                />
            }
            options={options.map((option, index) => (
                <MenuItem
                    key={index}
                    icon={option.icon}
                    iconSize={moderateScale(20)}
                    iconColor={colors.textPrimary200}
                    label={option.label}
                    onSelect={option.action}
                />
            ))}
            optionsContainerStyle={{
                backgroundColor: colors.menu100,
                borderRadius: moderateScale(5),
            }}
        />
    );
};

export default FolderMenu;