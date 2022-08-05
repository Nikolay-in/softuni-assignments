import { get } from "../services/api.js";
import { html } from "../utils.js";

const template = (cars) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">

    ${cars.length > 0
    ? cars.map(listingTemplate)
    : html`<p class="no-cars">No cars in database.</p>`
    }

    </div>
</section>
`

const listingTemplate = (listing) => html`
<div class="listing">
    <div class="preview">
        <img src=${listing.imageUrl}>
    </div>
    <h2>${listing.brand + ' ' + listing.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${listing.year}</h3>
            <h3>Price: ${listing.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${listing._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>
`

export async function allView(ctx) {

    const listings = await get('/data/cars?sortBy=_createdOn%20desc');

    ctx.render(template(listings));
}