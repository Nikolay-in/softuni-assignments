import { get } from "../controllers/api.js";
import { html } from "../node_modules/lit-html/lit-html.js";

const template = (input) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${input.map(el => html `
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src="${el.img}" />
                    <p>${el.description}</p>
                    <footer>
                        <p>Price: <span>${el.price} $</span></p>
                    </footer>
                    <div>
                        <a href="/catalog/${el._id}" class="btn btn-info">Details</a>
                    </div>
                </div>
            </div>
        </div>
    `)}
</div>`;

export async function showMyFurniture(ctx) {
    let data = await get('/data/catalog');

    data = data.filter(el => el._ownerId == JSON.parse(sessionStorage.getItem('userData')).id);

    ctx.render(template(data));
    ctx.setNav('my-publications')
}
