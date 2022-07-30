import { clearUserInfo, getUserInfo } from "../utils.js";

const host = 'http://localhost:3030';

async function request(url, method, data) {
    const options = {
        method,
        headers: {}
    }

    if (data) {
        options.headers['content-type'] = 'application/json';
        options.body = JSON.stringify(data)
    }

    const userData = getUserInfo();

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {

        const response = await fetch(host + url, options);

        if (response.ok == false) {
            if (response.status == 403) {
                clearUserInfo();
            }

            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return await response.json();
        }

    } catch (error) {
        alert(error.message);
        throw new Error(error.message);
    }
}

export async function get(url) {
    return await request(url, 'get');
}
export async function post(url, data) {
    return await request(url, 'post', data);
}
export async function put(url, data) {
    return await request(url, 'put', data);
}
export async function del(url) {
    return await request(url, 'delete');
}