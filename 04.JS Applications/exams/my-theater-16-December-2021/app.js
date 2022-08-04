import { loginView } from "./views/loginView.js";
import { setNavBar, page, render } from "./utils.js";
import { logout } from "./services/user.js";
import { registerView } from "./views/registerView.js";
import { homeView } from "./views/homeView.js";
import { createView } from "./views/createView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { profileView } from "./views/profileView.js";

const main = document.querySelector('main');
setNavBar();

// Page
page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/profile', profileView);


page.start();

// Middleware
function decorateContext(ctx, next) {
    ctx.render = (template) => {
        setNavBar();
        render(template, main);
    }
    next();
}

// Logout
document.querySelectorAll('nav li a')[2].addEventListener('click', async (e) => {
    e.preventDefault();
    await logout();
    setNavBar();
    page.redirect('/');
});