import { post } from "../api.js";

const section = document.body.children[2];
section.remove();

export function showLogin(ctx) {
    document.body.children[1].replaceWith(section);

    // Sign up button
    section.addEventListener('click', (e) => {
        if (e.target.tagName == 'A') {
            e.preventDefault()
            ctx.sections.register(ctx)
            ctx.setNavBar('register');
        }
    })


    const form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);
    
    async function onSubmit(e) {
        e.preventDefault()
        
        const formData = new FormData(form);

        let result = await post('/users/login', {email: formData.get('email'), password: formData.get('password')})
        
        if (result.accessToken) {
            form.reset()
            localStorage.setItem('userData', JSON.stringify({id: result._id , accessToken: result.accessToken}));
            ctx.setNavBar();
            ctx.sections.home();
        }
    }
}
