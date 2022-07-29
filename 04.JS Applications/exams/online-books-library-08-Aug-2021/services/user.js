import { setUserInfo, clearUserInfo, getUserInfo } from "../utils.js";
import { post, get } from "./api.js";

export async function login(data) {
    const res = await post('/users/login', data);
    if (res) {
        setUserInfo({
            accessToken: res.accessToken,
            email: res.email,
            id: res._id
        });
    }
}

export async function register(data) {
    const res = await post('/users/register', data);
    if (res) {
        setUserInfo({
            accessToken: res.accessToken,
            email: res.email,
            id: res._id
        });
    }
}

export async function logout() {
    await get('/users/logout');
    clearUserInfo();
}

export async function sendLike(bookId) {
    await post('/data/likes', { bookId });
}

export async function getLikes(bookId) {
    return await get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function getUserLikes(bookId) {
    const userData = getUserInfo()
    return await get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userData.id}%22&count`);
}