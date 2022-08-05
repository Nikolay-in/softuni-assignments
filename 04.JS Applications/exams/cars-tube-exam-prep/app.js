import { logout } from "./services/user.js";
import { allView } from "./views/all.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { myListingsView } from "./views/myListings.js";
import { registerView } from "./views/register.js";
import { searchView } from "./views/search.js";
import { render, setNavBar, page } from "./utils.js";

const main = document.querySelector('main');

// Page
page(decorateContext);
page('/', homeView);
page('/login', loginView)
page('/register', registerView)
page('/all', allView)
page('/create', createView)
page('/edit/:id', editView)
page('/details/:id', detailsView)
page('/my-listings', myListingsView)
page('/by-year', searchView)

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
document.querySelectorAll('nav #profile a')[3].addEventListener('click', async (e) => {
    e.preventDefault();
    await logout();
    setNavBar();
    page.redirect('/');
});