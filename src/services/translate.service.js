import axios from "axios";
import {GOOGLE_TRANSLATE_ENDPOINT} from "../constants/services";

export const translateGoogle = async (text) => {
    const response = await axios.post(GOOGLE_TRANSLATE_ENDPOINT + encodeURI(text));
    return response.data.result;
}