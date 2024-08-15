import {horizontalScale} from "../../utils/metrics";
import {Pressable} from "react-native";
import DetailsMenu from "../../screens/Details/components/DetailsMenu";

const HeaderDetailsMenuButton = ({bookId, enterEditMode}) => {
    return (
        <Pressable
            style={{
                paddingRight: horizontalScale(20),
            }}
        >
            <DetailsMenu
                bookId={bookId}
                enterEditMode={enterEditMode}
            />
        </Pressable>
    );
};

export default HeaderDetailsMenuButton;