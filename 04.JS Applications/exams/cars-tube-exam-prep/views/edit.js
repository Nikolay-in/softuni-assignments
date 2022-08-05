import { get, put } from "../services/api.js";
import { html } from "../utils.js";

const template = (car, onSubmit) => html`
<section id="edit-listing">
            <div class="container">

                <form id="edit-form" @submit=${onSubmit}>
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>
`

export async function editView(ctx) {

    const car = await get('/data/cars/' + ctx.params.id);

    ctx.render(template(car, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        const validation = Object.values(formData).some(el => el == '');

        if (validation) {
            return alert('All fields are required.');
        }

        if (Number(formData.year) <= 0 || Number(formData.price) <= 0) {
            return alert('Year and price must be positive numbers.')
        }

        await put('/data/cars/' + ctx.params.id, {
            brand: formData.brand,
            model: formData.model,
            description: formData.description,
            year: Number(formData.year),
            imageUrl: formData.imageUrl,
            price: Number(formData.price)
          });
        ctx.page.redirect('/details/' + ctx.params.id)
    }
}