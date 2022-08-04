import { del, get } from "../services/api.js";
import { getUserInfo, html, nothing } from "../utils.js";

const template = (album, userInfo, onRemove) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${album.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">
                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: ${album.date}</h4>
                <p>Description: ${album.description}</p>
            </div>

            ${ userInfo && userInfo.id == album._ownerId 
            ? html `
                <div class="actionBtn">
                    <a href="/edit/${album._id}" class="edit">Edit</a>
                    <a href="javascript:void(0);" class="remove" @click=${() => onRemove(album._id)}>Delete</a>
                </div>`
            : nothing
            }
            
        </div>
    </div>
</section>`;

export async function detailsView(ctx) {

    const album = await get('/data/albums/' + ctx.params.id);

    const userInfo = getUserInfo();

    ctx.render(template(album, userInfo, onRemove));

    async function onRemove(id) {
        await del('/data/albums/' + id);
        ctx.page.redirect('/catalog')
    }
}