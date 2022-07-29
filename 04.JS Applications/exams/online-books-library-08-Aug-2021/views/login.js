import { html } from '../utils.js';
import { login } from '../services/user.js';

const template = (onSubmit) => html`
        <section id="login-page" class="login">
            <form id="login-form" action="" method="" @submit=${onSubmit}>
                <fieldset>
                    <legend>Login Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Login">
                </fieldset>
            </form>
        </section>`

export function loginView(ctx) {

    ctx.render(template(onSubmit));
    ctx.setNavBar();

    async function onSubmit(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        if (formData.email == '' || formData.password == '') {
            return alert('All fields are required.');
        }

        await login(formData);
        ctx.page.redirect('/');
    }
}