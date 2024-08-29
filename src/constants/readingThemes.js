import {Themes} from "@epubjs-react-native/core";

const additionalStyles = (textIndent, lineHeight, fontWeight, textAlign, lineBreaks) => {
    return {
        "text-indent": `${textIndent}% !important`,
        "line-height": `${lineHeight}% !important`,
        // "font-weight": `${fontWeight} !important`,
        "text-align": `${textAlign} !important`,
        "hyphens": `${lineBreaks ? "auto" : "none"} !important`,
    };
}

const ReadingThemes = {
    Day: (textIndent, lineHeight, fontWeight, textAlign, lineBreaks) => ({
        ...Themes.LIGHT,
        body: {background: "#FFFFFF"},
        p: {
            color: "#000000 !important",
            ...additionalStyles(textIndent, lineHeight, fontWeight, textAlign, lineBreaks)
        }
    }),
    Night: (textIndent, lineHeight, fontWeight, textAlign, lineBreaks) => ({
        ...Themes.DARK,
        body: {background: "#000000"},
        p: {
            color: "#FFFFFF !important",
            ...additionalStyles(textIndent, lineHeight, fontWeight, textAlign, lineBreaks)
        }
    }),
    Sepia: (textIndent, lineHeight, fontWeight, textAlign, lineBreaks) => ({
        ...Themes.SEPIA,
        body: {
            background: "#F4ECD8",
        },
        p: {
            color: "#5D4037 !important",
            ...additionalStyles(textIndent, lineHeight, fontWeight, textAlign, lineBreaks),
            // Works only when reloading app
            // "font-family": `'Sevillana', cursive !important`,
        }
    })
}


export default ReadingThemes;
