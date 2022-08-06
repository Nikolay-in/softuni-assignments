import { register } from "../services/user.js";
import { html } from "../utils.js";

const template = (onSubmit) => html`
<section id="register">
          <div class="form" @submit=${onSubmit}>
            <h2>Register</h2>
            <form class="login-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="#">Login</a></p>
            </form>
          </div>
        </section>`

export const registerView = (ctx) => {

    ctx.render(template(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        if (formData.email == '' || formData.password == '') {
            return alert('All fields are required.');
        }

        if (formData.password !== formData['re-password']) {
            return alert('Passwords do not match.');
        }

        await register({ email: formData.email, password: formData.password });
        ctx.page.redirect('/dashboard');
    }
}