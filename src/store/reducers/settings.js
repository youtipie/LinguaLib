import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    openBookOnStartUp: false,
    fullScreenMode: false,
    screenShutdownDelay: false,
    animations: false,
    volumeButtons: false,
    translatingEngine: "Google Translate",
    targetLanguage: "uk",
    backup: false,
    language: "en",
}

export const settingsFields = {
    openBookOnStartUp: "openBookOnStartUp",
    fullScreenMode: "fullScreenMode",
    screenShutdownDelay: "screenShutdownDelay",
    animations: "animations",
    volumeButtons: "volumeButtons",
    translatingEngine: "translatingEngine",
    targetLanguage: "targetLanguage",
    backup: "backup",
    language: "language",
};

const settingsSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        updateSetting: (state, action) => {
            const {name, value} = action.payload;
            state[name] = value;
        },
        setOpenBookOnStartUp: (state, action) => {
            state.openBookOnStartUp = action.payload;
        },
        setFullScreenMode: (state, action) => {
            state.fullScreenMode = action.payload;
        },
        setScreenShutdownDelay: (state, action) => {
            state.screenShutdownDelay = action.payload;
        },
        setAnimations: (state, action) => {
            state.animations = action.payload;
        },
        setVolumeButtons: (state, action) => {
            state.volumeButtons = action.payload;
        },
        setTranslatingEngine: (state, action) => {
            state.translatingEngine = action.payload;
        },
        setTargetLanguage: (state, action) => {
            state.targetLanguage = action.payload;
        },
        setBackup: (state, action) => {
            state.backup = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
});

export const selectAllSettings = (state, action) => {
    return state.settings;
};
export const {updateSetting} = settingsSlice.actions;
export default settingsSlice.reducer;