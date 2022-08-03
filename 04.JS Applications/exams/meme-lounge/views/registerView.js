import { register } from '../services/user.js';
import { html, errorNotification } from '../utils.js';

const template = (submitHandler) => html`
<section id="register">
    <form id="register-form" @submit=${submitHandler}>
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="#">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>
`;

export function registerView(ctx) {
    ctx.render(template(submitHandler));

    async function submitHandler(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));
        
        if (formData.username == '' || formData.email == '' || formData.password == '') {
            return errorNotification('All fields are required.');
        }

        if (formData.password !== formData.repeatPass) {
            return errorNotification('Passwords do not match.');
        }

        await register({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            gender: formData.gender
        });

        ctx.page.redirect('/all-memes');
    }
}