import { post } from "../api.js";

const section = document.body.children[2];
section.remove();

export function showRegister(ctx) {
    document.body.children[1].replaceWith(section);

    // Sign in button
    section.addEventListener('click', (e) => {
        if (e.target.tagName == 'A') {
            e.preventDefault()
            ctx.sections.login(ctx)
            ctx.setNavBar('login');
        }
    })

    const form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);
    
    async function onSubmit(e) {
        e.preventDefault()
        
        const formData = new FormData(form);

        if (formData.get('email').length < 3) {
            return console.log('The email should be at least 3 characters long');
        }

        if (formData.get('password').length < 3) {
            return console.log('The password should be at least 3 characters long');
        }

        if (formData.get('password') != formData.get('repeatPassword')) {
            return console.log('Passwords do not match');
        }

        let result = await post('/users/register', {email: formData.get('email'), password: formData.get('password')})
        
        if (result.accessToken) {
            localStorage.setItem('userData', JSON.stringify({id: result._id , accessToken: result.accessToken}));
            ctx.setNavBar();
            ctx.sections.home()
        }
    }
}