import {useEffect, useLayoutEffect, useState} from 'react';
import HeaderSearchButton from "../components/navigation/HeaderSearchButton";

/**
 * Hook to add a search input to the navigation header and sync its value with route params.
 *
 * @param {object} navigation - Navigation object from React Navigation.
 */
const UseHeaderSearch = ({navigation}) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        navigation.setParams({inputValue})
    }, [inputValue]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <HeaderSearchButton
                    defaultValue={inputValue}
                    onTextChange={setInputValue}
                    navigation={navigation}
                />,
        });
    }, [navigation, inputValue, setInputValue]);
};

export default UseHeaderSearch;