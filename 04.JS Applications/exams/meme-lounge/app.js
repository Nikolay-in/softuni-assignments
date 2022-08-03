import { logout } from "./services/user.js";
import { allMemes } from "./views/allMemes.js";
import { createView } from "./views/createView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editMeme.js";
import { guestHome } from "./views/guestHome.js";
import { loginView } from "./views/loginView.js";
import { myProfileView } from "./views/myProfileView.js";
import { registerView } from "./views/registerView.js";
import { render, setNavBar, page, getUserInfo } from "/utils.js";

const main = document.querySelector('main');

const userInfo = getUserInfo();

// Page
page(decorateContext);
page('/all-memes', allMemes);
page('/', guestHome);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/my-profile', myProfileView);

if (userInfo && page.pathname == '/') {
    page.redirect('/all-memes');
}

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
document.querySelectorAll('nav .user a')[2].addEventListener('click', async (e) => {
    e.preventDefault();
    await logout();
    setNavBar();
    page.redirect('/');
});