import {colors, commonIcons} from "../../../constants/styles";
import {moderateScale} from "../../../utils/metrics";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import MenuWrapper from "../../../components/Menu/MenuWrapper";

const FolderMenu = ({folderId}) => {
    const options = [
        {icon: commonIcons.editSquare, label: 'Rename', action: () => console.log(`rename${folderId}`)},
        {icon: commonIcons.minusSquare, label: 'Remove', action: () => console.log(`remove${folderId}`)},
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
            options={options}
            optionsContainerStyle={{
                backgroundColor: colors.menu100,
                borderRadius: moderateScale(5),
            }}
        />
    );
};

export default FolderMenu;