import { get, put } from "../services/api.js";
import { html } from "../utils.js";

const template = (offer, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="title" id="job-title" placeholder="Title" .value=${offer.title} />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${offer.imageUrl} />
            <input type="text" name="category" id="job-category" placeholder="Category" .value=${offer.category} />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50">${offer.description}</textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4" cols="50">${offer.requirements}</textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${offer.salary} />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export async function editView(ctx) {

    const offer = await get('/data/offers/' + ctx.params.id);

    ctx.render(template(offer, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        const validation = Object.values(formData).some(el => el == '');

        if (validation) {
            return alert('All fields are required.');
        }

        await put('/data/offers/' + ctx.params.id, formData);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}