import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useReader} from "@epubjs-react-native/core";
import {selectAllReadingSettings} from "../store/reducers/settings";
import ReadingThemes from "../constants/readingThemes";


const UseBookSettings = (callback) => {
    const settings = useSelector(selectAllReadingSettings);
    const {changeFontFamily, changeFontSize, changeTheme, injectJavascript} = useReader();

    function applyReadingSettings() {
        changeTheme(
            ReadingThemes[settings.colorScheme](settings.textIndent, settings.lineSpacing, settings.fontBoldness, settings.textAlignment, settings.lineBreaks, settings.font)
        );
        changeFontSize(`${settings.fontSize}px`)
        // changeFontFamily(settings.font)

        callback && callback();
    }

    useEffect(() => {
        applyReadingSettings();
    }, [settings])

    return {applyReadingSettings};
};

export default UseBookSettings;