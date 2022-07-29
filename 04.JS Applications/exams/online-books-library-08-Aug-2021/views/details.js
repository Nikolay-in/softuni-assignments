import { getUserInfo, html, nothing } from "../utils.js";
import { del, get } from "../services/api.js";
import { getLikes, getUserLikes, sendLike } from "../services/user.js";

const template = (book, userId, onDelete, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <div class="actions">
            ${book._ownerId == userId 
            ? html `
                <a class="button" href="/edit/${book._id}">Edit</a>
                <a class="button" href="javascript:void(0);" @click=${() => onDelete(book._id)}>Delete</a>`
            : nothing }
            
            ${ userId && book._ownerId !== userId && book.userLikes == 0
            ? html`<a class="button" href="javascript:void(0);" @click=${() => onLike(book._id)}>Like</a>`
            : nothing }

            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${book.likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

export async function detailsView(ctx) {
    // Get book
    const book = await get('/data/books/' + ctx.params.id);

    // Get likes
    book.likes = await getLikes(ctx.params.id);

    // Get current user
    const currentUser = getUserInfo();

    // Get user likes
    book.userLikes = 0;
    if (currentUser) {
        book.userLikes = await getUserLikes(ctx.params.id);
    }

    ctx.render(template(book, currentUser?.id, onDelete, onLike));
    ctx.setNavBar();

    async function onDelete(id) {
        const confirmation = confirm('Are you sure you want to delete this book?');

        if (confirmation) {
            await del('/data/books/' + id);
            ctx.page.redirect('/');
        }
    }

    function onLike(id) {
        book.likes++;
        book.userLikes++;
        sendLike(id);
        ctx.render(template(book, currentUser?.id, onDelete, onLike));
    }
}