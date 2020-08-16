import {BASE_URL} from './../configs/Constants';
import {getAuthToken} from "./auth";
import {post, get, Delete, put} from './fetch_requests';

export const getAllTasks = async () => {
    let token = await getAuthToken();
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${token}`);

    return get(`${BASE_URL}tasks`, header);
}

export const addTasks = async (body) => {
    let token = await getAuthToken();
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${token}`);

    return post(`${BASE_URL}tasks`, header, body);
}

export const deleteTasks = async (id) => {
    let token = await getAuthToken();
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${token}`);

    return Delete(`${BASE_URL}tasks/${id}`, header);
}

export const editTasks = async (id, body) => {
    let token = await getAuthToken();
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${token}`);

    return put(`${BASE_URL}tasks/${id}`, header, body )
}
