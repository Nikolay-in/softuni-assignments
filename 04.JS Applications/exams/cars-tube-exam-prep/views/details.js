import { del, get } from "../services/api.js";
import { getUserInfo, html, nothing } from "../utils.js";

const template = (car, onDelete, currentUser) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>
        ${ currentUser && currentUser.id === car._ownerId
        ? html`
        <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a href="javascript:void(0)" class="button-list" @click=${()=> onDelete(car._id)}>Delete</a>
        </div>`
        : nothing}
        
    </div>
</section>`

export async function detailsView(ctx) {

    const car = await get('/data/cars/' + ctx.params.id);

    const currentUser = getUserInfo();

    ctx.render(template(car, onDelete, currentUser));

    async function onDelete(id) {
        const confirmation = confirm('Are you sure you want to delete this listing?');

        if (confirmation) {
            await del('/data/cars/' + id);
            ctx.page.redirect('/all');
        }
    }
}