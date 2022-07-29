import { html } from '../utils.js';
import { register } from '../services/user.js';

const template = (onSubmit) => html`
        <section id="register-page" class="register">
            <form id="register-form" action="" method="" @submit=${onSubmit}>
                <fieldset>
                    <legend>Register Form</legend>
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
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
        </section>`

export function registerView(ctx) {

    ctx.render(template(onSubmit));
    ctx.setNavBar();

    async function onSubmit(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        console.log(formData);
        if (formData.email == '' || formData.password == '') {
            return alert('All fields are required.');
        }

        if (formData.password !== formData['confirm-pass']) {
            return alert('Passwords do not match.');
        }

        await register({email: formData.email, password: formData.password});
        ctx.page.redirect('/');
    }
}