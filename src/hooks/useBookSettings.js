import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useReader} from "@epubjs-react-native/core";
import {selectAllReadingSettings} from "../store/reducers/settings";
import ReadingThemes from "../constants/readingThemes";


const UseBookSettings = () => {
    const settings = useSelector(selectAllReadingSettings);
    const {changeFontSize, changeTheme, injectJavascript} = useReader();

    function applyReadingSettings() {
        injectJavascript(`
            WebFont.load({
              google: {
                families: ['${settings.font.displayName}']
              },
              context: window.frames[0],
            });
        `)
        changeTheme(
            ReadingThemes[settings.colorScheme](settings.textIndent, settings.lineSpacing, settings.fontBoldness, settings.textAlignment, settings.lineBreaks, settings.font.cssValue)
        );
        changeFontSize(`${settings.fontSize}px`)
    }

    useEffect(() => {
        applyReadingSettings();
    }, [settings])

    return {applyReadingSettings};
};

export default UseBookSettings;