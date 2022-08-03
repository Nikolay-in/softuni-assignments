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
    const [user, guest] = [...document.querySelectorAll('nav .user, nav .guest')];
    const userInfo = getUserInfo();

    const navButtons = [...document.querySelectorAll('nav a')]
    navButtons.forEach(el => {
        el.classList.remove('active');
        
        if (ctx && el.attributes.href.textContent == ctx.pathname) {
            el.classList.add('active');
        }
    });

    if (userInfo) {
        user.style.display = 'block';
        guest.style.display = 'none';
        document.querySelector('nav .profile span').textContent = `Welcome, ${userInfo.email}`;
    } else {
        user.style.display = 'none';
        guest.style.display = 'block';
    }
}

const errorBox = document.querySelector('body #errorBox');
const errorSpan = document.querySelector('body #errorBox span');

export const errorNotification = (err) => {
    errorSpan.textContent = err;
    errorBox.style.display = 'block';
    setTimeout(() => { 
        errorBox.style.display = 'none';
        errorSpan.textContent = '';
     }, 3000);
}

export { page, html, render, nothing } 