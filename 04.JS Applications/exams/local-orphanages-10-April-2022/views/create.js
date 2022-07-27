import { post } from "../services/api.js";
import { html } from "../utils.js";

const template = (onSubmit) => html`
<section id="create-page" class="auth">
            <form id="create" @submit=${onSubmit}>
                <h1 class="title">Create Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title">
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description">
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl">
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address">
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone">
                </article>

                <input type="submit" class="btn submit" value="Create Post">
            </form>
        </section>`;



export const createView = (ctx) => {
    ctx.render(template(onSubmit));
    ctx.setNavBar();

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if (data.title == '' || data.description == '' || data.imageUrl == '' || data.address == '' || data.phone == '') {
            return alert('All fields are required');
        }

        await post('/data/posts', data);
    
        ctx.page.redirect('/');
    }
}

