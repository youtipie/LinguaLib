import {ScrollView, View, StyleSheet, Image, Text} from "react-native";
import {mockBooks, mockFolderData} from "../../constants/other";
import {colors, commonStyles, folderIcons, fonts} from "../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../utils/metrics";
import DetailsItem from "./components/DetailsItem";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import AnimatedTextExpand from "../../UI/AnimatedTextExpand";
import {useState} from "react";
import minutesToTimeString from "../../utils/minutesToTimeString";
import InputField from "../../UI/InputField";
import FolderSelect from "./components/FolderSelect";
import LanguageSelectMenu from "./components/LanguageSelectMenu";
import UseEditBook from "../../hooks/useEditBook";

const mockBookDetails = {
    description: "Geralt is a Witcher, a man whose magic powers, enhanced by long training and a mysterious elixir, " +
        "have made him a brilliant fighter and a merciless hunter. Yet he is no ordinary killer. His sole purpose: " +
        "to destroy the monsters that plague the world.",
    folder: mockFolderData[0],
    language: "English",
    timeSpent: 70,
    page: 127,
    totalPages: 924,
    filename: "the-witcher.epub",
}

const Details = ({route}) => {
    const {bookId} = route.params;

    // Just mock data. Will remove later. Don't want to bother adding this to all books.
    const [book, setBook] = useState({
        ...mockBooks.find(book => book.id === bookId),
        ...mockBookDetails
    });

    const [form, setForm] = useState({
        title: book.title,
        author: book.author,
        description: book.description,
        language: book.language,
        folder: book.folder
    });

    function updateForm(name, value) {
        setForm(prevState => ({...prevState, [name]: value})
        );
    }

    function onSubmit() {
        setBook(prevState => ({
            ...prevState,
            ...form,
        }));
    }

    const isEditing = UseEditBook({bookId, form, onSubmit});

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <View style={styles.card}>
                <View style={styles.posterWrapper}>
                    <Image style={styles.poster} source={{uri: book.cover}}/>
                    <View style={styles.titleWrapper}>
                        {
                            isEditing ?
                                <InputField
                                    inputStyles={styles.title}
                                    placeholder="Enter title"
                                    defaultValue={book.title}
                                    onChangeText={(value) => updateForm("title", value)}
                                    multiline={true}
                                />
                                :
                                <Text style={styles.title}>{book.title}</Text>
                        }
                    </View>
                </View>
                <View style={styles.cardContent}>
                    <DetailsItem
                        title="Author"
                        content={book.author}
                        isEditing={isEditing}
                        defaultValue={book.author}
                        onChangeText={(value) => updateForm("author", value)}
                    />
                    {
                        isEditing ?
                            <DetailsItem
                                title="Annotation"
                                content={book.annotation}
                                isEditing={isEditing}
                                defaultValue={book.annotation}
                                onChangeText={(value) => updateForm("annotation", value)}
                            />
                            :
                            (
                                book.annotation.length <= 100 ?
                                    <DetailsItem
                                        title="Annotation"
                                        content={book.annotation}
                                    />
                                    :
                                    <DetailsItem title="Annotation">
                                        <AnimatedTextExpand
                                            startText={book.annotation.slice(0, 100)}
                                            endText={book.annotation.slice(100, book.annotation.length)}
                                            textStyle={commonStyles.detailText}
                                            addEllipsis={true}
                                        />
                                    </DetailsItem>
                            )
                    }
                    {isEditing ?
                        <LanguageSelectMenu
                            defaultValue={book.language}
                            onSelect={(value) => updateForm("language", value)}
                        />
                        :
                        <DetailsItem
                            title="Original language"
                            content={book.language}
                        />
                    }
                    <DetailsItem
                        title="Time spent reading"
                        content={minutesToTimeString(book.timeSpent)}
                    />
                    <DetailsItem
                        title="Reading progress"
                        content={`${book.page} of ${book.totalPages} pages`}
                    />

                    <DetailsItem title="Book location">
                        <View style={styles.folderDetails}>
                            <FontAwesomeIcon
                                style={styles.folderIcon}
                                icon={folderIcons.folder}
                                size={moderateScale(16)}
                                color={colors.textPrimary200}
                            />
                            {isEditing ?
                                <FolderSelect
                                    onSelect={(value) => updateForm("folder", value)}
                                    defaultValue={book.folder}
                                />
                                :
                                <AnimatedTextExpand
                                    startText={book.folder.title}
                                    endText={` => ${book.folder.path}/${book.filename}`}
                                    textStyle={commonStyles.detailText}
                                />
                            }
                        </View>
                    </DetailsItem>
                </View>
            </View>
        </ScrollView>
    );
};

export default Details;

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        backgroundColor: colors.primary200,
        padding: moderateScale(15),
    },
    card: {
        width: "100%",
        backgroundColor: colors.primary100,
        paddingVertical: moderateScale(10),
    },
    posterWrapper: {
        width: "100%",
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: colors.primary200,
    },
    poster: {
        height: moderateScale(365),
        objectFit: "contain"
    },
    titleWrapper: {
        paddingHorizontal: moderateScale(10),
    },
    title: {
        fontFamily: fonts.primaryBold,
        fontSize: moderateScale(26),
        color: colors.textPrimary200,
        textAlign: "center",
        marginVertical: verticalScale(10)
    },
    cardContent: {
        paddingTop: moderateScale(10),
        paddingHorizontal: moderateScale(10),
    },
    folderDetails: {
        flexDirection: "row",
        alignItems: "center"
    },
    folderIcon: {
        marginRight: horizontalScale(5)
    },
});