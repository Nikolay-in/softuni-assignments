import { login } from '../services/user.js';
import { html, errorNotification } from '../utils.js';

const template = (submitHandler) => html`
<section id="login">
    <form id="login-form" @submit=${submitHandler}>
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>
`;

export function loginView(ctx) {
    ctx.render(template(submitHandler));

    async function submitHandler(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        if (formData.email == '' || formData.password == '') {
            return errorNotification('All fields are required.');
        }

        await login(formData);
        ctx.setNavBar(ctx);
        ctx.page.redirect('/all-memes')
    }
}