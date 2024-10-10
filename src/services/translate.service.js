import {translate} from 'google-translate-api-x';

export const translateGoogle = async (text) => {
    const response = await translate(text, {to: 'uk', client: 'gtx'});
    return response.map(res => res.text);
}