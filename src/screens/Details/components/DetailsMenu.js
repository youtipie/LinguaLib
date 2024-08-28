import {withObservables} from "@nozbe/watermelondb/react";
import {useNavigation} from "@react-navigation/native";
import {moderateScale} from "../../../utils/metrics";
import {colors, commonIcons} from "../../../constants/styles";
import DrawerIcon from "../../../components/navigation/DrawerIcon";
import MenuWrapper from "../../../components/Menu/MenuWrapper";
import MenuItem from "../../../components/Menu/MenuItem";
import BookDAO from "../../../database/DAO/BookDAO";
import useModal from "../../../hooks/useModal";


const DetailsMenu = ({bookId, book, enterEditMode}) => {
    const navigation = useNavigation();
    const {showModal} = useModal();

    const options = [
        {
            icon: book.isFinished ? commonIcons.cross : commonIcons.check,
            label: 'Mark as ' + (book.isFinished ? 'un' : '') + 'read',
            action: async () => await book.toggleIsFinished()
        },
        {icon: commonIcons.edit, label: 'Edit', action: enterEditMode},
        {icon: commonIcons.share, label: 'Share', action: () => console.log(`share${bookId}`)},
        {icon: commonIcons.restore, label: 'Restore', action: () => console.log(`restore${bookId}`)},
        {
            icon: commonIcons.trash,
            label: 'Delete',
            action: () => {
                showModal(
                    "Confirm action",
                    "Are you sure you want to delete this book? This action cannot be undone.",
                    "Cancel",
                    () => {
                    },
                    "Continue",
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
            optionsContainerStyle={{backgroundColor: colors.primary100}}
        />
    );
};

const enhance = withObservables(["bookId"], ({bookId, enterEditMode}) => ({
    book: BookDAO.observeById(bookId)
}));

export default enhance(DetailsMenu);