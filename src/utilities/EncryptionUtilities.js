import { DECRYPT_KEY } from "./../configs/Constants";
import CryptoJS from 'react-native-crypto-js';

export const decryptText = (text) => {
    let bytes = CryptoJS.AES.decrypt(text, DECRYPT_KEY);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}
