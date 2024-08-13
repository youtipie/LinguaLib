import {
    faArrowLeft,
    faBars,
    faBookOpen,
    faBookOpenReader,
    faCheck, faCirclePlus, faEllipsis,
    faExclamation,
    faFolder,
    faGear, faSdCard, faSearch
} from "@fortawesome/free-solid-svg-icons";
import {moderateScale} from "../utils/metrics";
import {faMinusSquare, faPenToSquare} from "@fortawesome/free-regular-svg-icons";

export const colors = {
    primary100: "#1C1C1C",
    primary200: "#2C2C2C",
    primary300: "#6D6D6D",
    textPrimary100: "#E0E0E0",
    textPrimary200: "#B0B0B0",
    textAccent100: "#757575",
    textAccent200: "#00BCD4",
    success100: "#00784D",
    success200: "#00D488",
    success300: "#355449",
    statusBar: "#F3F3F3",
    accent100: "#BA5BDB",
    accent200: "#543765",
    menu100: "#333333"
}

export const fonts = {
    primaryRegular: "montserrat-regular",
    primaryBold: "montserrat-bold",
}

export const drawerIcons = {
    openDrawer: faBars,
    goBack: faArrowLeft,
    header: faBookOpen,
    search: faSearch,
    reading: faBookOpenReader,
    finished: faCheck,
    folders: faFolder,
    settings: faGear,
    about: faExclamation,
}

export const headerStyle = {
    headerStyle: {
        backgroundColor: colors.primary100,
    },
    headerTitleStyle: {
        fontSize: moderateScale(24),
        fontFamily: fonts.primaryBold,
    },
    headerTitleContainerStyle: {
        width: "100%",
    },
    headerTintColor: colors.textPrimary100,
};

export const folderIcons = {
    rootFolder: faSdCard,
    folder: faFolder,
}

export const commonIcons = {
    addCircle: faCirclePlus,
    minusSquare: faMinusSquare,
    editSquare: faPenToSquare,
    dotsHorizontal: faEllipsis,
}