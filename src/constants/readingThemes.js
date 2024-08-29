import {Themes} from "@epubjs-react-native/core";

const createTheme = (baseTheme, background, textColor) => (
    textIndent,
    lineHeight,
    fontWeight,
    textAlign,
    lineBreaks,
    fontFamily
) => ({
    ...baseTheme,
    body: {
        background
    },
    "p, a, h1, h2, h3, h4, h5, li, span": {
        color: `${textColor} !important`,
        hyphens: `${lineBreaks ? "auto" : "none"} !important`,
        "text-indent": `${textIndent}% !important`,
        "line-height": `${lineHeight}% !important`,
        "font-weight": `${fontWeight} !important`,
        "text-align": `${textAlign} !important`,
        "font-family": `${fontFamily} !important`,
    },
});

const ReadingThemes = {
    Day: createTheme(Themes.LIGHT, "#FFFFFF", "#000000"),
    Night: createTheme(Themes.DARK, "#000000", "#FFFFFF"),
    Sepia: createTheme(Themes.SEPIA, "#F4ECD8", "#5D4037"),
};


export default ReadingThemes;
