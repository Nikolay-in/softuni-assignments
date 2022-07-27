import { getUserInfo } from "../utils.js";
import { get } from "./api.js";

export async function getAllPosts() {
    return await get('/data/posts?sortBy=_createdOn%20desc');
}

export async function getMyPosts() {
    const userData = getUserInfo()
    return await get(`/data/posts?where=_ownerId%3D%22${userData.id}%22&sortBy=_createdOn%20desc`);
}