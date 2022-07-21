import { html } from '../node_modules/lit-html/lit-html.js';
import { get } from '../controllers/api.js';

function getCatalog(input) {
    const data = html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
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
    </div>`

    return data;
}



export async function catalogView(ctx) {
    const data = await get('/data/catalog');
    ctx.render(getCatalog(data));
    ctx.setNav('dashboard')
    //TODO Functionality
    
}