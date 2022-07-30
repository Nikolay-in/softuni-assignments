import { html } from '../utils.js';
import { get, put } from '../services/api.js';

const template = (game, onSubmit) => html`
<!-- Edit Page ( Only for the creator )-->
<section id="edit-page" class="auth">
            <form id="edit" @submit=${onSubmit}>
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value=${game.title}>

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" value=${game.category}>

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value=${game.maxLevel}>

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value=${game.imageUrl}>

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary">${game.summary}</textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>`;

export async function editView(ctx) {

    const game = await get('/data/games/' + ctx.params.id);

    ctx.render(template(game, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        const isEmpty = Object.values(data).some(e => e == '');

        if (isEmpty) {
            return alert('All fields are required');
        }

        await put('/data/games/' + ctx.params.id, data);
        ctx.page.redirect('/');
    }
}