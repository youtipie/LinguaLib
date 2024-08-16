import {useLayoutEffect, useState} from 'react';
import {Pressable, Text, View} from "react-native";
import {colors} from "../constants/styles";
import HeaderDetailsEditMenu from "../screens/Details/components/HeaderDetailsEditMenu";
import HeaderDetailsMenuButton from "../components/navigation/HeaderDetailsMenuButton";
import {useNavigation} from "@react-navigation/native";

const UseEditBook = ({bookId, form, onSubmit}) => {
    const navigation = useNavigation();
    const [isEditing, setEditing] = useState(false);

    function handleReadPress() {
        navigation.navigate("ReadBook", {bookId});
    }

    function handleSubmitForm() {
        onSubmit()
        setEditing(false);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: ({children, tintColor, style}) => (
                <View style={{flexDirection: 'row', marginRight: -16}}>
                    <Text style={[{color: tintColor}, style]}>{children}</Text>
                    {
                        !isEditing &&
                        <Pressable style={{marginLeft: "auto"}} onPress={handleReadPress}>
                            <Text style={[{color: colors.success100}, style]}>Read</Text>
                        </Pressable>
                    }
                </View>
            ),
            headerRight: () => (
                isEditing ?
                    <HeaderDetailsEditMenu
                        onCancel={() => setEditing(false)}
                        onConfirm={handleSubmitForm}
                    />
                    :
                    <HeaderDetailsMenuButton
                        bookId={bookId}
                        enterEditMode={() => setEditing(true)}
                    />
            )

        });
    }, [navigation, isEditing, form])
    return isEditing;
};

export default UseEditBook;