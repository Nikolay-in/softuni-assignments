import { html } from "../utils.js";
import { register } from "../services/user.js";

const template = (onSubmit) => html`
<section id="registerPage">
    <form class="registerForm" @submit=${onSubmit}>
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="#">here</a></span>
        </p>
    </form>
</section>
`;

export function registerView(ctx) {

    ctx.render(template(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        if (formData.email == '' || formData.password == '') {
            return alert('All fields are required.');
        }

        if (formData.password !== formData.repeatPassword) {
            return alert('Passwords do not match.');
        }

        await register({ email: formData.email, password: formData.password });
        ctx.page.redirect('/');
    }
}