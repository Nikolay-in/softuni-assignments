import { get } from "../services/api.js";
import { getUserInfo, html, nothing } from "../utils.js";

const template = (results, searchHandler, userInfo) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button class="button-list" @click=${searchHandler}>Search</button>
    </div>

    <h2>Results:</h2>

    ${results 
    ? html `
        <div class="search-result">
        ${results.length > 0
        ? results.map(albums => resultTemplate(albums, userInfo))
        : html `<p class="no-result">No result.</p>`
        }
    </div>`
    : nothing
    }
    
</section>`;

const resultTemplate = (result, userInfo) => html`
<div class="card-box">
    <img src=${result.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${result.name}</p>
            <p class="artist">Artist: ${result.artist}</p>
            <p class="genre">Genre: ${result.genre}</p>
            <p class="price">Price: $${result.price}</p>
            <p class="date">Release Date: ${result.releaseDate}</p>
        </div>
        ${ userInfo 
        ? html `
            <div class="btn-group">
                <a href="/details/${result._id}" id="details">Details</a>
            </div>`
        : nothing
        }
        
    </div>
</div>
`

export function searchView(ctx) {

    const userInfo = getUserInfo();

    let results;

    ctx.render(template(results, searchHandler, userInfo));

    async function searchHandler() {
        const searchInput = document.getElementById('search-input');

        const results = await get(`/data/albums?where=name%20LIKE%20%22${encodeURIComponent(searchInput.value)}%22`);

        ctx.render(template(results, searchHandler, userInfo));
    }
}