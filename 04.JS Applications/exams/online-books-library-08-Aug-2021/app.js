import { logout } from './services/user.js';
import { render, page, setNavBar } from './utils.js';
import { addView } from './views/add.js';
import { dashboardView } from './views/dashboard.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { loginView } from './views/login.js';
import { myBooksView } from './views/my-books.js';
import { registerView } from './views/register.js';

const main = document.querySelector('main');

setNavBar();

// Page setup
page(decorateContext);
page('/', dashboardView);
page('/login', loginView);
page('/register', registerView);
page('/add', addView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/my-books', myBooksView);
page.start();

// Main renderer
function renderMain(template) {
    render(template, main);
}

// Decoration function
function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.setNavBar = setNavBar;
    next();
}

// Logout functionality
const logoutBtn = document.querySelectorAll('nav a')[5];
logoutBtn.addEventListener('click', async () => { 
    await logout();
    page.redirect('/');
});