import { get, put } from "../services/api.js";
import { html } from "../utils.js";

const template = (onSubmit, post) => html`
<section id="edit-page" class="auth">
            <form id="edit" @submit=${onSubmit}>
                <h1 class="title">Edit Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title" .value=${post.title}>
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description" .value=${post.description}>
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl" .value=${post.imageUrl}>
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address" .value=${post.address}>
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone" .value=${post.phone}>
                </article>

                <input type="submit" class="btn submit" value="Edit Post">
            </form>
        </section>`;




export async function editView(ctx) {
    const post = await get('/data/posts/' + ctx.params.id);

    ctx.render(template(onSubmit, post));
    ctx.setNavBar();

    async function onSubmit(e) {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        if (data.title == '' || data.description == '' || data.imageUrl == '' || data.address == '' || data.phone == '') {
            return alert('All fields are required');
        }

        await put('/data/posts/' + ctx.params.id, data)

        ctx.page.redirect('/details/' + ctx.params.id);
    }
}