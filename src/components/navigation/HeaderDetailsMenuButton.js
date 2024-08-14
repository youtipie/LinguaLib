import {horizontalScale} from "../../utils/metrics";
import {Pressable} from "react-native";
import DetailsMenu from "../../screens/Details/components/DetailsMenu";

const HeaderDetailsMenuButton = ({bookId}) => {
    return (
        <Pressable
            style={{
                paddingRight: horizontalScale(20),
            }}
        >
            <DetailsMenu
                bookId={bookId}
            />
        </Pressable>
    );
};

export default HeaderDetailsMenuButton;