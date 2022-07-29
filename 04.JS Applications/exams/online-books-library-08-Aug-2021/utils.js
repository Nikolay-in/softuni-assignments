import page from "./node_modules/page/page.mjs";
import { html, render, nothing } from "./node_modules/lit-html/lit-html.js";

export function getUserInfo() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserInfo(userData) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

export function clearUserInfo() {
    sessionStorage.clear();
}

export function setNavBar() {
    const [guest, user] = Array.from(document.querySelectorAll('nav #guest, nav #user'));
    const userInfo = getUserInfo();

    if (userInfo) {
        user.style.display = 'block';
        guest.style.display = 'none';

        user.querySelector('span').textContent = `Welcome, ${userInfo.email}`;
    } else {
        user.style.display = 'none';
        guest.style.display = 'block';
    }
}

export { page, html, render, nothing } 