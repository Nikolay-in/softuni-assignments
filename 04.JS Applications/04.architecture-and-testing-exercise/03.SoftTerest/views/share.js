import { post } from "../api.js";

const section = document.body.children[2];
section.remove();

export function showShare(ctx) {
    document.body.children[1].replaceWith(section);

    const form = section.querySelector('form');

    form.addEventListener('submit', onSubmit);

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(form);

        if (formData.get('title').length < 6) {
            return console.log('The title should be at least 6 characters long.');
        }

        if (formData.get('description').length < 10) {
            return console.log('The description should be at least 10 characters long.');
        }

        if (formData.get('imageURL').length < 5) {
            return console.log('The image url should be at least 5 characters long.');
        }

        //Submit
        const result = post('/data/ideas', {
            title: formData.get('title'),
            description: formData.get('description'),
            img: formData.get('imageURL')
        });

        //Go to dashboard
        if (result) {
            ctx.sections.dashboard(ctx)
            ctx.setNavBar();
        }
    }
}