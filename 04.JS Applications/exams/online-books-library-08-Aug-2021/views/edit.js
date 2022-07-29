import { html } from "../utils.js";
import { get, put } from "../services/api.js";

const template = (book, onSubmit) => html`
<section id="edit-page" class="edit">
            <form id="edit-form" action="#" method="" @submit=${onSubmit}>
                <fieldset>
                    <legend>Edit my Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" value=${book.title}>
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description"
                                id="description">${book.description}</textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" value=${book.imageUrl}>
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" value=${book.type}>
                                <option value="Fiction" selected>Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section>`;

export async function editView(ctx) {

    const book = await get('/data/books/' + ctx.params.id);

    ctx.render(template(book, onSubmit));
    ctx.setNavBar();

    async function onSubmit(e) {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        if (data.title == '' || data.description == '' || data.imageUrl == '' || data.type == '') {
            return alert('All fields are required');
        }

        await put('/data/books/' + ctx.params.id, data);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}