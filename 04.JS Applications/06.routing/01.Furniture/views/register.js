import { html } from '../node_modules/lit-html/lit-html.js';
import { register } from '../controllers/register.js';

const template = (onSubmit) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>`;


export function registerView(ctx) {
    ctx.render(template(onSubmit));
    ctx.setNav('register')

    async function onSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

        if (!formData.get('email') || !formData.get('password')) {
            return console.log('All fields are required');
        }

        if (formData.get('password') !== formData.get('rePass')) {
            return console.log('Passwords dont match');
        }

        await register({
            email: formData.get('email'),
            password: formData.get('password')
        });

        ctx.setNav('dashboard')
        ctx.page.redirect('/')
    }
}
    