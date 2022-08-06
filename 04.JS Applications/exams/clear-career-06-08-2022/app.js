import { logout } from "./services/user.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { render, setNavBar, page } from "/utils.js";

const main = document.querySelector('main');

// Page
page(decorateContext);
page('/', homeView)
page('/login', loginView)
page('/register', registerView)
page('/dashboard', dashboardView)
page('/create', createView)
page('/details/:id', detailsView)
page('/edit/:id', editView)

page.start();

// Decoration
function decorateContext(ctx, next) {
    setNavBar(ctx);
    ctx.render = (template) => {
        ctx.setNavBar = setNavBar;
        render(template, main);
    }
    next();
}

// Logout functionality
document.querySelectorAll('nav .user a')[1].addEventListener('click', async (e) => {
    e.preventDefault();
    await logout();
    setNavBar();
    page.redirect('/dashboard');
});