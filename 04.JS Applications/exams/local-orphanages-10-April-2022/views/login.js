import { login } from "../services/user.js";
import { html } from "../utils.js";

const template = (onSubmit) => html`
    <section id="login-page" class="auth">
        <form id="login" @submit=${onSubmit}>
            <h1 class="title">Login</h1>

            <article class="input-group">
                <label for="login-email">Email: </label>
                <input type="email" id="login-email" name="email">
            </article>

            <article class="input-group">
                <label for="password">Password: </label>
                <input type="password" id="password" name="password">
            </article>

            <input type="submit" class="btn submit-btn" value="Log In">
        </form>
    </section>`;


export const loginView = (ctx) => {
    ctx.render(template(onSubmit));
    ctx.setNavBar();

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (formData.get('email') == '' || formData.get('password') == '') {
            return alert('All fields are required');
        }
    
        const userData = {
            email: formData.get('email'),
            password: formData.get('password')
        }
    
        await login(userData);
        ctx.page.redirect('/');
    }
}