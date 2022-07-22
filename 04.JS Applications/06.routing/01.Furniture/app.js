import { render as litRender } from './node_modules/lit-html/lit-html.js';
import page from './node_modules/page/page.mjs';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { showDetail } from './views/details.js';
import { editView } from './views/edit.js';
import { showMyFurniture } from './views/my-furniture.js';

import { isLogged, setNav, onLogout } from './utils.js';
import { delItem } from './controllers/deleteItem.js';

const main = document.querySelector('div.container');

setNav('dashboard')

page(decorateContext);
page('/index.html', '/');
page('/', catalogView);
page('/create', createView);
page('/login', loginView);
page('/logout', onLogout);
page('/register', registerView);
page('/my-furniture', showMyFurniture);
page('/catalog/:id', showDetail);
page('/edit/:id', editView);
page('/delete/:id', delItem);
page.start();

function decorateContext(ctx, next) {
    ctx.render = render;
    ctx.isLogged = isLogged;
    ctx.setNav = setNav;
    next();
}

function render(data) {
    litRender(data, main);
}