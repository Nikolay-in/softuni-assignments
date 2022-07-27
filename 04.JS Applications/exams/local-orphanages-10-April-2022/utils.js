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
    const [userNav, guestNav] = Array.from(document.querySelectorAll('nav #user, nav #guest'));

    if (getUserInfo()) {
        userNav.style.display = 'block';
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'block';
    }
}

export { page, html, render, nothing } 