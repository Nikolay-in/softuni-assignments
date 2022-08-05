import { get } from "../services/api.js";
import { getUserInfo, html } from "../utils.js";

const template = (cars) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

    ${ cars.length > 0 
    ? cars.map(listingTemplate)
    : html `<p class="no-cars"> You haven't listed any cars yet.</p>`
    }

    </div>
</section>
`

const listingTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand + ' ' + car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`

export async function myListingsView(ctx) {

    const userInfo = getUserInfo();

    const cars = await get(`/data/cars?where=_ownerId%3D%22${userInfo.id}%22&sortBy=_createdOn%20desc`);

    ctx.render(template(cars));
}