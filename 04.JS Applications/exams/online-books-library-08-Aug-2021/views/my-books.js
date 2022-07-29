import { getUserInfo, html } from "../utils.js";
import { get } from "../services/api.js";

const template = (books) => html`
        <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            <!-- Display ul: with list-items for every user's books (if any) -->
            ${books.length > 0 
            ? html `<ul class="my-books-list">
                    ${books.map(bookTemplate)}
                    </ul>`
            : html `<p class="no-books">No books in database!</p>`}
        </section>`;

const bookTemplate = (book) => html`
                <li class="otherBooks">
                    <h3>${book.title}</h3>
                    <p>Type: ${book.type}</p>
                    <p class="img"><img src="${book.imageUrl}"></p>
                    <a class="button" href="/details/${book._id}">Details</a>
                </li>`;


export async function myBooksView(ctx) {

    const { id } = getUserInfo();

    const books = await get(`/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);

    ctx.render(template(books));
    ctx.setNavBar();
}