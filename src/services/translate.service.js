import {languages, translate} from 'google-translate-api-x';
import {translatingEngines} from "../store/reducers/settings";

export const translateText = async (text, targetLanguage, translatingEngine) => {
    switch (translatingEngine) {
        case translatingEngines.googleTranslate:
        default:
            return await translateGoogle(text, targetLanguage);

    }
}

export const getLanguages = (translatingEngine) => {
    switch (translatingEngine) {
        case translatingEngines.googleTranslate:
        default:
            const {"auto": _, ...rest} = languages;
            return rest;
    }
}

const translateGoogle = async (text, targetLanguage) => {
    const response = await translate(text, {to: targetLanguage, client: 'gtx'});
    return response.map(res => res.text);
}