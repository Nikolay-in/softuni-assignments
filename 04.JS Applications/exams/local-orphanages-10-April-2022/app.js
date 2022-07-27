import { logout } from "./services/user.js";
import { setNavBar, page, render } from "./utils.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { myPostsView } from "./views/my-posts.js";
import { registerView } from "./views/register.js";

const main = document.querySelector('main');
document.querySelectorAll('nav #user a')[2].addEventListener('click', onLogout);


page(decorateCtx);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/posts', myPostsView);
page.start();

setNavBar();

function renderMain(template) {
    render(template, main);
}

function decorateCtx(ctx, next) {
    ctx.render = renderMain;
    ctx.setNavBar = setNavBar;
    next();
}

async function onLogout() {
    await logout();
    page.redirect('/');
}