import { login } from "../services/user.js";
import { html } from "../utils.js";

const template = (onSubmit) => html`
<section id="loginPage">
    <form class="loginForm" @submit=${onSubmit}>
        <img src="./images/logo.png" alt="logo" />
        <h2>Login</h2>

        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="#">here</a></span>
        </p>
    </form>
</section>`;

export function loginView(ctx) {

    ctx.render(template(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        if(formData.email == '' || formData.password == '') {
            return alert('All fields are required.');
        }

        await login(formData);
        ctx.setNavBar();
        ctx.page.redirect('/');
    }
}




