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

    const userInfo = getUserInfo();
    const navButtons = [...document.querySelectorAll('nav ul li')];

    if (userInfo) {
        navButtons[2].style.display = 'none';
        navButtons[3].style.display = 'none';
        navButtons[4].style.display = 'inline';
        navButtons[5].style.display = 'inline';
    } else {
        navButtons[2].style.display = 'inline';
        navButtons[3].style.display = 'inline';
        navButtons[4].style.display = 'none';
        navButtons[5].style.display = 'none';
    }
}

export { page, html, render, nothing } 