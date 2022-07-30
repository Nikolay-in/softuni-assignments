import { logout } from "./services/user.js";
import { render, setNavBar, page } from "./utils.js";
import { allGamesView } from "./views/all-games.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";



const main = document.querySelector('main');

// Init page
page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/all-games', allGamesView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page.start();


setNavBar();



function renderMain(template) {
    setNavBar();
    return render(template, main);
}

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.setNavBar = setNavBar;
    next();
}

// Logout functionality
const logoutBtn = document.querySelectorAll('nav a')[2];
logoutBtn.addEventListener('click', async () => {
    await logout();
    page.redirect('/');
});