import { get, put } from '../services/api.js';
import { html, errorNotification } from '../utils.js';

const template = (meme, onSubmit) => html`
<section id="edit-meme">
            <form id="edit-form" @submit=${onSubmit}>
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description">${meme.description}</textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>
`;

export async function editView(ctx) {

    const meme = await get('/data/memes/' + ctx.params.id);

    ctx.render(template(meme, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        if (formData.title == '' || formData.description == '' || formData.imageUrl == '') {
            return errorNotification('All fields are required.');
        }

        await put('/data/memes/' + ctx.params.id, formData);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}