import { post } from "../services/api.js";
import { html } from "../utils.js";

const template = (onSubmit) => html`
<section id="create-listing">
    <div class="container">
        <form id="create-form" @submit=${onSubmit}>
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`
export const createView = (ctx) => {

    ctx.render(template(onSubmit));

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

        await post('/data/cars', {
            brand: formData.brand,
            model: formData.model,
            description: formData.description,
            year: Number(formData.year),
            imageUrl: formData.imageUrl,
            price: Number(formData.price)
          });

        ctx.page.redirect('/all')
    }
}
