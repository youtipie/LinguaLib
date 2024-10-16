import {createSlice} from "@reduxjs/toolkit";
import {colorSchemeOptions, fontOptions, textAlignmentOptions} from "../../constants/settings";

const initialState = {
    appSettings: {
        openBookOnStartUp: false,
        lastOpenedBook: null,
        fullScreenMode: false,
        screenShutdownDelay: false,
        volumeButtons: false,
        translatingEngine: "Google Translate",
        targetLanguage: "uk",
        language: "en",
    },
    readingSettings: {
        colorScheme: colorSchemeOptions.sepia,
        font: fontOptions.merriweather,
        fontSize: 20,
        fontBoldness: 300,
        textIndent: 0,
        lineSpacing: 110,
        textAlignment: textAlignmentOptions.justify,
        lineBreaks: true,
        translation: false,
    }
};

export const appSettingsFields = {
    openBookOnStartUp: "openBookOnStartUp",
    lastOpenedBook: "lastOpenedBook",
    fullScreenMode: "fullScreenMode",
    screenShutdownDelay: "screenShutdownDelay",
    volumeButtons: "volumeButtons",
    translatingEngine: "translatingEngine",
    targetLanguage: "targetLanguage",
    language: "language",
};

export const readingSettingsFields = {
    colorScheme: "colorScheme",
    font: "font",
    fontSize: "fontSize",
    fontBoldness: "fontBoldness",
    textIndent: "textIndent",
    lineSpacing: "lineSpacing",
    textAlignment: "textAlignment",
    lineBreaks: "lineBreaks",
    translation: "translation",
}

const settingsSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        updateAppSetting: (state, action) => {
            const {name, value} = action.payload;
            state.appSettings[name] = value;
        },
        updateReadingSetting: (state, action) => {
            const {name, value} = action.payload;
            state.readingSettings[name] = value;
        },
    }
});

export const selectAllAppSettings = (state) => state.settings.appSettings;
export const selectAllReadingSettings = (state) => state.settings.readingSettings;

export const {updateAppSetting, updateReadingSetting} = settingsSlice.actions;
export default settingsSlice.reducer;
