import { get } from "../services/api.js";
import { html } from "../utils.js";

const template = (offers) => html`
<section id="dashboard">
    <h2>Job Offers</h2>
    ${ offers.length > 0 
    ? offers.map(singleOffer)
    : html `<h2>No offers yet.</h2>`
    }
</section>`;

const singleOffer = (offer) => html`
<div class="offer">
    <img src=${offer.imageUrl} alt="example1" />
    <p>
        <strong>Title: </strong><span class="title">${offer.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
    <a class="details-btn" href="/details/${offer._id}">Details</a>
</div>`

export async function dashboardView(ctx) {

    const offers = await get('/data/offers?sortBy=_createdOn%20desc');

    ctx.render(template(offers));
}