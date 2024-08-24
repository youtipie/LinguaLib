import {useState} from "react";
import {ScrollView, View, StyleSheet, Image, Text} from "react-native";
import {colors, commonStyles, folderIcons, fonts} from "../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../utils/metrics";
import DetailsItem from "./components/DetailsItem";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import AnimatedTextExpand from "../../UI/AnimatedTextExpand";
import minutesToTimeString from "../../utils/minutesToTimeString";
import InputField from "../../UI/InputField";
import FolderSelect from "./components/FolderSelect";
import LanguageSelectMenu from "./components/LanguageSelectMenu";
import UseEditBook from "../../hooks/useEditBook";
import {compose, withObservables} from "@nozbe/watermelondb/react";
import BookDAO from "../../database/DAO/BookDAO";


const Details = ({book, folder}) => {
    const [form, setForm] = useState({
        title: book.title,
        author: book.author,
        description: book.description,
        language: book.language,
        folder: folder
    });

    function updateForm(name, value) {
        setForm(prevState => ({...prevState, [name]: value})
        );
    }

    async function onSubmit() {
        await book.changeMeta(form.title, form.author, form.description, form.language, form.folder);
    }

    const isEditing = UseEditBook({bookId: book.id, form, onSubmit});

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
                    {isEditing ?
                        <DetailsItem
                            title="Annotation"
                            content={book.description}
                            isEditing={isEditing}
                            defaultValue={book.description}
                            onChangeText={(value) => updateForm("description", value)}
                        />
                        :
                        (
                            book.description.length <= 100 ?
                                <DetailsItem
                                    title="Annotation"
                                    content={book.description}
                                />
                                :
                                <DetailsItem title="Annotation">
                                    <AnimatedTextExpand
                                        startText={book.description.slice(0, 100)}
                                        endText={book.description.slice(100, book.description.length)}
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
                                    defaultValue={folder}
                                />
                                :
                                <AnimatedTextExpand
                                    startText={folder.title}
                                    endText={` => ${folder.path}/${book.filename}`}
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

const enhance = compose(
    withObservables(["route"], ({route}) => ({
        book: BookDAO.observeById(route.params?.bookId)
    })),
    withObservables(["book"], ({book}) => ({
        folder: book.folder
    }))
);

export default enhance(Details);

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
        alignItems: "center",
        width: "90%",
    },
    folderIcon: {
        marginRight: horizontalScale(5)
    },
});