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
    const [home, dashboard, login, register, create, logout] = Array.from(document.querySelectorAll('nav a'));

    if (getUserInfo()) {
        create.style.display = 'block';
        logout.style.display = 'block';
        login.style.display = 'none';
        register.style.display = 'none';
    } else {
        create.style.display = 'none';
        logout.style.display = 'none';
        login.style.display = 'block';
        register.style.display = 'block';
    }
}

export { page, html, render, nothing } 