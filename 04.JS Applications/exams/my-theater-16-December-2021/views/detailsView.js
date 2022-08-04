import { del, get, post } from "../services/api.js";
import { getUserInfo, html, nothing } from "../utils.js";

const template = (event, onDelete, onLike) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${event.title}</h1>
            <div>
                <img src=${event.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${event.description}</p>
            <h4>Date: ${event.date}</h4>
            <h4>Author: ${event.author}</h4>
            <div class="buttons">
                ${event.currentUser && event.currentUser.id == event._ownerId 
                ? html `
                    <a class="btn-delete" href="javascript:void(0);" @click=${() => onDelete(event._id)}>Delete</a>
                    <a class="btn-edit" href="/edit/${event._id}">Edit</a>`
                : nothing
                }

                ${event.currentUser && event.currentUser.id !== event._ownerId && event.userLikes == 0
                ?   html`<a class="btn-like" href="javascript:void(0);" @click=${(e) => onLike(e, event._id)}>Like</a>`
                : nothing
                }
            </div>
            <p class="likes">Likes: ${event.likes}</p>
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {

    const e = await get('/data/theaters/' + ctx.params.id);
    
    e.currentUser = getUserInfo();

    e.likes = await get(`/data/likes?where=theaterId%3D%22${ctx.params.id}%22&distinct=_ownerId&count`);
    e.userLikes = 0;

    if (e.currentUser) {
        e.userLikes = await get(`/data/likes?where=theaterId%3D%22${ctx.params.id}%22%20and%20_ownerId%3D%22${e.currentUser.id}%22&count`);
    }

    ctx.render(template(e, onDelete, onLike));

    async function onDelete(id) {
        await del('/data/theaters/' + id);
        ctx.page.redirect('/profile');
    }

    function onLike(ev, theaterId) {
        ev.target.style.display = 'none';
        e.likes = Number(e.likes) + 1;
        e.userLikes = Number(e.userLikes) + 1;
        ctx.render(template(e, onDelete, onLike));
        post('/data/likes', {theaterId});
    }
}