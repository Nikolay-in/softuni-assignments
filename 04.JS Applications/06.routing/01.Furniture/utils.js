import { get } from './controllers/api.js';
import { html, render } from './node_modules/lit-html/lit-html.js'

const buttons = {
    'dashboard' : 'catalogLink',
    'create' : 'createLink',
    'logout' : 'logoutBtn',
    'login' : 'loginLink',
    'register' : 'registerLink',
    'my-publications': 'profileLink'
}

const nav = document.querySelector('nav');

export const setNav = (active) => {
    let navbar;

    if (isLogged()) {
        navbar = html`<a id="catalogLink" href="/">Dashboard</a>
<div id="user">
    <a id="createLink" href="/create">Create Furniture</a>
    <a id="profileLink" href="/my-furniture">My Publications</a>
    <a id="logoutBtn" href="/logout">Logout</a>
</div>`
    } else {
        navbar = html`<a id="catalogLink" href="/">Dashboard</a>
<div id="guest">
    <a id="loginLink" href="/login">Login</a>
    <a id="registerLink" href="/register">Register</a>
</div>`
    }

    render(navbar, nav)

    // Activate appropriate
    const activeBtn = buttons[active];
    // Clear any active
    Array.from(document.querySelectorAll('nav a')).forEach(e => e.classList.remove('active'));
    // Apply class
    document.querySelector(`nav a#${activeBtn}`).classList.add('active')
}

export const isLogged = () => {
    if (sessionStorage.getItem('userData')) {
        return JSON.parse(sessionStorage.getItem('userData')).id
    } else {
        return false;
    }
}

export const onLogout = (ctx) => {
    get('/users/logout')
    sessionStorage.clear();
    ctx.setNav('dashboard')
    ctx.page.redirect('/');
}