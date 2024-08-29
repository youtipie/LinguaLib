import countryLanguage from "country-language";

// Had one problem: a lot of countries speak those languages, so flag icon is messed up sometimes.
// Found one solution: make separate list for popular languages.
const priorityCountries = {
    "eng": "US",  // English
    "spa": "ES",  // Spanish
    "hin": "IN",  // Hindi
    "ara": "EG",  // Arabic
    "fre": "FR",  // French
    "por": "PT",  // Portuguese
    "rus": "RU",  // Russian
    "deu": "DE",  // German
    "ita": "IT",  // Italian
    "chi": "CN",  // Chinese
    "dut": "NL",  // Dutch
};

export const getFlagEmoji = (countryCode) => {
    if (!countryCode) {
        return null;
    }

    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

export const languageIconList = countryLanguage.getLanguageCodes(2).reduce((results, languageCode) => {
    const language = countryLanguage.getLanguage(languageCode);
    const countryCode = (priorityCountries[languageCode] && priorityCountries[languageCode]) || language.countries?.[0]?.code_2;

    const languageName = language.name?.length && language.name[0];
    const flagEmoji = getFlagEmoji(countryCode);
    if (languageName && flagEmoji) {
        results.push({language: languageName, icon: flagEmoji});
    }

    return results;
}, []);

export const getLanguageByCode = (languageCode) => {
    const sanitizedLanguageCode = languageCode.split("-")[0];
    const language = countryLanguage.getLanguage(sanitizedLanguageCode);
    return (language.name?.length && language.name[0]) || "Unknown";
}
