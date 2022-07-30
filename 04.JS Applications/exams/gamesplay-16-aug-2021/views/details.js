import { getUserInfo, html, nothing } from "../utils.js";
import { get, del } from "../services/api.js";
import { getComments, sendComment } from "../services/user.js";

const template = (game, onDelete, userId, submitComment) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
        <div class="game-header">
            <img class="game-img" src="${game.imageUrl}" />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">
        ${game.summary}
        </p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            ${game.comments.length > 0 
            ? html `
            <ul>
                ${game.comments.map(el => html `
                <li class="comment">
                    <p>Content: ${el.comment}</p>
                </li>
                `)}
            </ul>`
            : html `<p class="no-comment">No comments.</p>`}
        </div>

        ${ userId && userId == game._ownerId
        ? html`<div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a href="javascript:void(0);" class="button" @click=${() => onDelete(game._id)}>Delete</a>
        </div>`
        : nothing}
    </div>

    ${ userId && userId !== game._ownerId 
    ? html`<article class="create-comment">
        <label>Add new comment:</label>
        <form class="form" @submit=${(e) => submitComment(e, game._id)}>
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>`
    : nothing}
</section>`;

export async function detailsView(ctx) {

    const currentUser = getUserInfo();

    const game = await get('/data/games/' + ctx.params.id);

    // Comments
    game.comments = await getComments(ctx.params.id);

    ctx.render(template(game, onDelete, currentUser?.id, submitComment));

    async function onDelete(id) {
        const confirmation = confirm('Are you sure you want to delete this game?');

        if (confirmation) {
            await del('/data/games/' + id);
            ctx.page.redirect('/');
        }
    }

    async function submitComment(e, id) {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        await sendComment(id, data.comment);
        e.target.reset();
        ctx.page.redirect('/details/' + id);
    }
}