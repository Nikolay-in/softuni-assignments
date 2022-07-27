import { register } from "../services/user.js";
import { html, setUserInfo } from "../utils.js";

const template = (onSubmit) => html`
<section id="register-page" class="auth">
    <form id="register" @submit=${onSubmit}>
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
    </form>
</section>`;



export const registerView = (ctx) => {
    ctx.render(template(onSubmit));
    ctx.setNavBar();

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData);

        if (userData.email == '' || userData.password == '' || userData.repeatPassword == '') {
            return alert('All fields are required.');
        }

        if (userData.password !== userData.repeatPassword) {
            return alert('Passwords do not match.');
        }

        const registerData = await register({
            email: userData.email,
            password: userData.password
        });

        if (registerData) {
            setUserInfo(registerData);
        }

        ctx.page.redirect('/');
    }
}