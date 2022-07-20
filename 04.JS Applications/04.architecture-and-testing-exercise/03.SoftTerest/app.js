import { showHome } from "./views/home.js";
import { showRegister } from "./views/register.js";
import { showLogin } from "./views/login.js";
import { showCards } from "./views/cards.js";
import { viewCard } from "./views/card.js";
import { showShare } from "./views/share.js";

import { get } from "./api.js";
import { setNavBar } from "./utils.js";
// logout function utils.js

const sections = {
    home: showHome,
    register: showRegister,
    login: showLogin,
    dashboard: showCards,
    viewCard,
    create: showShare
}

setNavBar();
showHome();

document.querySelector('nav').addEventListener('click', onNavigate);



function onNavigate(e) {
    e.preventDefault();

    if (e.target.tagName == 'A') {
        const destination = e.target.textContent.toLowerCase();

        if (destination == 'logout') {
            onLogout()
        }

        const view = sections[destination];
        setNavBar(destination);
        if (typeof view == "function") {
            view({
                sections,
                setNavBar
            });
        }
    }

    // Home logo
    if (e.target.tagName == 'IMG') {
        setNavBar();
        showHome();
    }
}

async function onLogout() {
    await get('/users/logout');
    localStorage.removeItem('userData');
    setNavBar();
    showHome()
}