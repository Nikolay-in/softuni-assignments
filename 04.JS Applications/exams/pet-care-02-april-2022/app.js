import { logout } from "./services/user.js";
import { page, render, setNavBar } from "./utils.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";

const main = document.querySelector('main');

setNavBar();

page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/dashboard', dashboardView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page.start();


function renderMain(template) {
    render(template, main);
}

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.setNavBar = setNavBar;
    next();
}

const logoutBtn = Array.from(document.querySelectorAll('nav a'))[5];
logoutBtn.addEventListener('click', onLogout);

async function onLogout() {
    await logout();
    setNavBar();
    page.redirect('/');
}
