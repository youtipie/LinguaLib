import {ScrollView, View, StyleSheet, Image, Text, Pressable} from "react-native";
import {mockBooks} from "../../constants/other";
import {colors, commonIcons, commonStyles, drawerIcons, folderIcons, fonts} from "../../constants/styles";
import {horizontalScale, moderateScale, verticalScale} from "../../utils/metrics";
import DetailsItem from "./components/DetailsItem";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import AnimatedTextExpand from "../../UI/AnimatedTextExpand";
import {useLayoutEffect} from "react";
import DrawerIcon from "../../components/navigation/DrawerIcon";
import HeaderDetailsMenuButton from "../../components/navigation/HeaderDetailsMenuButton";


const Index = ({route, navigation}) => {
    const {bookId} = route.params;
    const book = mockBooks.find(book => book.id === bookId);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: ({children, tintColor, style}) => (
                <View style={{flexDirection: 'row', marginRight: -16}}>
                    <Text style={[{color: tintColor}, style]}>{children}</Text>
                    <Pressable style={{marginLeft: "auto"}}>
                        <Text style={[{color: colors.success100}, style]}>Read</Text>
                    </Pressable>
                </View>
            ),
            headerRight: () => <HeaderDetailsMenuButton bookId={bookId}/>
        });
    }, [navigation])

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <View style={styles.card}>
                <View style={styles.posterWrapper}>
                    <Image style={styles.poster} source={{uri: book.coverUri}}/>
                    <Text style={styles.title}>{book.title}</Text>
                </View>
                <View style={styles.cardContent}>
                    <DetailsItem
                        title="Author"
                        content={book.author}
                    />
                    <DetailsItem title="Annotation">
                        <AnimatedTextExpand
                            startText="Geralt is a Witcher, a man whose magic powers, enhanced by long training and a"
                            endText=" mysterious elixir, have made him a brilliant fighter and a merciless hunter. Yet he is no ordinary killer. His sole purpose: to destroy the monsters that plague the world."
                            replaceOriginalText={true}
                            textStyle={commonStyles.detailText}
                        />
                    </DetailsItem>
                    <DetailsItem
                        title="Original language"
                        content="English"
                    />
                    <DetailsItem
                        title="Time spent reading"
                        content="12.5 hours"
                    />
                    <DetailsItem
                        title="Reading progress"
                        content="127 of 946 pages"
                    />

                    <DetailsItem title="Book location">
                        <View style={styles.folderDetails}>
                            <FontAwesomeIcon
                                style={styles.folderIcon}
                                icon={folderIcons.folder}
                                size={moderateScale(16)}
                                color={colors.textPrimary200}
                            />
                            <AnimatedTextExpand
                                startText="Default"
                                endText=" => /Downloads/the-witcher.epub"
                                textStyle={commonStyles.detailText}
                            />
                        </View>
                    </DetailsItem>
                </View>
            </View>
        </ScrollView>
    );
};

export default Index;

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