import { logout } from "./services/user.js";
import { catalogView } from "./views/catalogView.js";
import { createView } from "./views/createView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { searchView } from "./views/searchView.js";
import { render, setNavBar, page } from "/utils.js";

const main = document.querySelector('main');

// Page
page(decorateContext);
page('/', homeView)
page('/login', loginView)
page('/register', registerView)
page('/catalog', catalogView)
page('/create', createView)
page('/details/:id', detailsView)
page('/edit/:id', editView)
page('/search', searchView)
page.start();

// Decoration
function decorateContext(ctx, next) {
    ctx.render = (template) => {
        setNavBar();
        render(template, main);
    }
    next();
}

// Logout functionality
document.querySelectorAll('nav ul li')[5].addEventListener('click', async (e) => {
    e.preventDefault();
    await logout();
    setNavBar();
    page.redirect('/');
});