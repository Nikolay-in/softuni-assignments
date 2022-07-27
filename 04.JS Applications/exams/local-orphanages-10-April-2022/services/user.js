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

export async function sendDonation(postId) {
    await post('/data/donations', { postId });
}

export async function getDonations(postId) {
    return await get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
}

export async function getUserDonations(postId) {
    const userData = getUserInfo()
    return await get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userData.id}%22&count`);
}



