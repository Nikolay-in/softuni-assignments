import { register } from "../services/user.js";
import { html } from "../utils.js";

const template = (onSubmit) => html`
<section id="register-page" class="content auth">
            <form id="register" @submit=${onSubmit}>
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">

                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">

                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">

                    <input class="btn submit" type="submit" value="Register">

                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>`;

export const registerView = (ctx) => {

    ctx.render(template(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        if (data.email == '' || data.password == '') {
            return alert('All fields are required.');
        }

        if (data.password !== data['confirm-password']) {
            return alert('Passwords do not match.');
        }

        await register({ email: data.email, password: data.password });
        ctx.page.redirect('/');
    }
}