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
    }
});

export const selectAllSettings = (state, action) => {
    return state.settings;
};
export const {updateSetting} = settingsSlice.actions;
export default settingsSlice.reducer;