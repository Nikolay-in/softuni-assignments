import { login } from "../services/user.js";
import { html } from "../utils.js";

const template = (onSubmit) => html`
<section id="login">
    <div class="form" @submit=${onSubmit}>
        <h2>Login</h2>
        <form class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>`

export const loginView = (ctx) => {

    ctx.render(template(onSubmit))

    async function onSubmit(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        if (formData.email == '' || formData.password == '') {
            return alert('All fields are required.');
        }

        await login({ email: formData.email, password: formData.password });
        ctx.page.redirect('/dashboard');
    }
}