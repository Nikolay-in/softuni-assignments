import { register } from "../services/user.js";
import { html } from "../utils.js";

const template = (onSubmit) => html`
<section id="registerPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="#">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`

export const registerView = (ctx) => {

    ctx.render(template(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        if (formData.email == '' || formData.password == '') {
            return alert('All fields are required.');
        }

        if (formData.password !== formData['conf-pass']) {
            return alert('Passwords do not match.');
        }

        await register({ email: formData.email, password: formData.password });
        ctx.page.redirect('/');
    }
}