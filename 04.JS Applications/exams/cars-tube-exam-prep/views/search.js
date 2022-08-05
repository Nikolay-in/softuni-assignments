import { get } from "../services/api.js";
import { html, nothing } from "../utils.js";

const template = (searchHandler, result = null) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button class="button-list" @click=${searchHandler}>Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        ${ result 
        ?  result.length > 0 
            ? result.map(resultTemplate)
            : html`<p class="no-cars"> No results.</p>`
        : nothing
        }
        
    </div>
</section>`

const resultTemplate = (car) => html`
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

export function searchView(ctx) {

    ctx.render(template(searchHandler));

    async function searchHandler() {

        const searchField = document.getElementById('search-input');

        const result = await get(`/data/cars?where=year%3D${searchField.value}`);
        
        ctx.render(template(searchHandler, result));
    }
}