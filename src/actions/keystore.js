import {BASE_URL} from './../configs/Constants';
import {getAuthToken} from "./auth";
import {post, get, Delete, put} from './fetch_requests';

export const getAllKeys = async () => {
    let token = await getAuthToken();
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${token}`);

    return get(`${BASE_URL}keystore`, header);
}
