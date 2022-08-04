import { get } from "../services/api.js";
import { getUserInfo, html, nothing } from "../utils.js";

const template = (albums, userInfo) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${albums.length > 0 
    ? albums.map(album => albumTemplate(album, userInfo))
    : html`<p>No Albums in Catalog!</p>`
    }
</section>
`;

const albumTemplate = (album, userInfo) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${userInfo
        ? html`
            <div class="btn-group">
                <a href="/details/${album._id}" id="details">Details</a>
            </div>`
        : nothing
        }
        
    </div>
</div>`;

export async function catalogView(ctx) {

    const albums = await get('/data/albums?sortBy=_createdOn%20desc&distinct=name');

    const userInfo = getUserInfo();

    ctx.render(template(albums, userInfo));
}