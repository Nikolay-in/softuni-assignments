import { del, get } from '../services/api.js';
import { getUserInfo, html, nothing } from '../utils.js';

const template = (meme, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>
            ${ meme.currentUserId == meme._ownerId 
            ? html`
                <a class="button warning" href="/edit/${meme._id}">Edit</a>
                <button class="button danger" @click=${(e) => onDelete(e, meme._id)}>Delete</button>`
            : nothing 
            }
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {

    const meme = await get('/data/memes/' + ctx.params.id);

    const currentUser = getUserInfo();

    meme.currentUserId = currentUser?.id;

    ctx.render(template(meme, onDelete));

    async function onDelete(e, id) {
        e.preventDefault();
        await del('/data/memes/' + id);
        ctx.page.redirect('/all-memes');
    }
}