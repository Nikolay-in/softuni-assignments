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

export function setNavBar(ctx) {
    const [guest, profile] = [...document.querySelectorAll('nav #guest, nav #profile')];
    const userInfo = getUserInfo();

    const navButtons = [...document.querySelectorAll('nav a[href]')]
    navButtons.forEach(el => {
        el.classList.remove('active');

        if (ctx && el.attributes.href.textContent == ctx.pathname) {
            el.classList.add('active');
        }
    });

    if (userInfo) {
        profile.style.display = 'block';
        guest.style.display = 'none';
        document.querySelector('nav #profile a').textContent = `Welcome ${userInfo.username}`;
    } else {
        profile.style.display = 'none';
        guest.style.display = 'block';
    }
}

export { page, html, render, nothing } 