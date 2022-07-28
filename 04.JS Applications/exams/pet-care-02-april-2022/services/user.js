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

export async function sendDonation(petId) {
    await post('/data/donation', { petId });
}

export async function getDonations(petId) {
    return await get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export async function getUserDonations(petId) {
    const userData = getUserInfo()
    return await get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userData.id}%22&count`);
}



