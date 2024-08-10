import {colors} from "../constants/styles";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

const DrawerIcon = ({icon, color, size, focused}) => {
    return (
        <FontAwesomeIcon
            icon={icon}
            color={focused ? colors.success200 : color}
            size={size}
        />
    );
};

export default DrawerIcon;