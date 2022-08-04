import { get, put } from "../services/api.js";
import { html } from "../utils.js";

const template = (e, onSubmit) => html`
<section id="editPage">
            <form class="theater-form" @submit=${onSubmit}>
                <h1>Edit Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" value=${e.title}>
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" value=${e.date}>
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                        value=${e.author}>
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                        placeholder="Description">${e.description}</textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                        value=${e.imageUrl}>
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
`;

export async function editView(ctx) {

    const e = await get('/data/theaters/' + ctx.params.id);

    ctx.render(template(e, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        const validation = [...Object.values(formData)].some(el => el == '');
        
        if (validation) {
            return alert('All fields are required');
        }
        
        await put('/data/theaters/' + ctx.params.id, formData);
        ctx.page.redirect('/details/' + ctx.params.id)
    }
}