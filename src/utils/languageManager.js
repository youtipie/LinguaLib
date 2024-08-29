import countryFlagEmoji from "country-flag-emoji";
import countryLanguage from "country-language";

const languageData = countryFlagEmoji.list;

// TODO: Find good way of getting languages and their flag icons
export const languageIconList = languageData.reduce((results, country) => {
    const lang = countryLanguage.getCountry(country.code).langCultureMs?.[0]?.displayName?.split(" ")[0];
    if (lang) {
        results.push({language: lang, icon: country.emoji});
    }
    return results;
}, []).sort((a, b) => a.language.localeCompare(b.language));

export const getLanguageByCode = (code) => {
    const langCode = code.split("-")[0];
    return countryLanguage.getLanguage(langCode).langCultureMs?.[0]?.displayName?.split(" ")[0] || "Unknown"
}