import {useEffect, useState} from "react";
import {Switch} from "react-native";
import {colors} from "../constants/styles";

const SwitchButton = ({style, defaultValue = false, onChange}) => {
    const [isEnabled, setIsEnabled] = useState(defaultValue);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    useEffect(() => {
        onChange(isEnabled);
    }, [isEnabled]);

    return (
        <Switch
            style={style}
            trackColor={{false: colors.accent200, true: colors.success300}}
            thumbColor={isEnabled ? colors.success200 : colors.accent100}
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
    );
};

export default SwitchButton;