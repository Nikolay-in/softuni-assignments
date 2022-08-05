import { login } from "../services/user.js";
import { html } from "../utils.js";

const template = (onSubmit) => html`
<section id="login">
    <div class="container">
        <form id="login-form" action="#" method="post" @submit=${onSubmit}>
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>
`;

export const loginView = (ctx) => {

    ctx.render(template(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        if (formData.username == '' || formData.password == '') {
            return alert('All fields are required.');
        }

        await login(formData);
        ctx.page.redirect('/all')
    }
}