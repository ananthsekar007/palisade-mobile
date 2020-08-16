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

export const addKeys = async (body) => {
    let token = await getAuthToken();
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${token}`);

    return post(`${BASE_URL}keystore`, header, body);
}

export const deleteKeys = async (id) => {
    let token = await getAuthToken();
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${token}`);

    return Delete(`${BASE_URL}keystore/${id}`, header);
}
