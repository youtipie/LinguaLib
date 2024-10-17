import {withObservables} from "@nozbe/watermelondb/react";
import {useNavigation} from "@react-navigation/native";
import {horizontalScale, moderateScale} from "../../../utils/metrics";
import {colors, commonIcons} from "../../../constants/styles";
import DrawerIcon from "../../../components/navigation/DrawerIcon";
import MenuWrapper from "../../../components/Menu/MenuWrapper";
import MenuItem from "../../../components/Menu/MenuItem";
import BookDAO from "../../../database/DAO/BookDAO";
import useModal from "../../../hooks/useModal";
import {useTranslation} from "react-i18next";


const DetailsMenu = ({bookId, book, enterEditMode}) => {
    const navigation = useNavigation();
    const {showModal} = useModal();
    const {t} = useTranslation();

    const options = [
        {
            icon: book.isFinished ? commonIcons.cross : commonIcons.check,
            label: book.isFinished ? t("screens.Details.markUnread") : t("screens.Details.markRead"),
            action: async () => await book.toggleIsFinished()
        },
        {icon: commonIcons.edit, label: t("screens.Details.editButton"), action: enterEditMode},
        {icon: commonIcons.share, label: t("screens.Details.shareButton"), action: () => console.log(`share${bookId}`)},
        {
            icon: commonIcons.restore,
            label: t("screens.Details.restoreButton"),
            action: () => console.log(`restore${bookId}`)
        },
        {
            icon: commonIcons.trash,
            label: t("screens.Details.deleteButton"),
            action: () => {
                showModal(
                    t("utils.modal.confirmAction"),
                    t("screens.Details.modalDelete"),
                    t("utils.modal.cancel"),
                    () => {
                    },
                    t("utils.modal.continue"),
                    async () => {
                        await book.delete();
                        navigation.goBack();
                    }
                )
            }
        },
    ];

    return (
        <MenuWrapper
            trigger={
                <DrawerIcon
                    icon={commonIcons.dotsVertical}
                    size={moderateScale(24)}
                    color={colors.textPrimary100}
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
            width={horizontalScale(200)}
            optionsContainerStyle={{backgroundColor: colors.primary100}}
        />
    );
};

const enhance = withObservables(["bookId"], ({bookId, enterEditMode}) => ({
    book: BookDAO.observeById(bookId)
}));

export default enhance(DetailsMenu);