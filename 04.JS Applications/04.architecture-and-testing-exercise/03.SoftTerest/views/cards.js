import { get } from "../api.js";

const section = document.body.children[2];
section.remove();

export async function showCards(ctx) {
    // No cards element
    const noEls = document.createElement('h1');
    noEls.textContent = 'No ideas yet! Be the first one :)';

    section.innerHTML = '';
    
    document.body.children[1].replaceWith(section);

    // Get cards
    const cards = await get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
    
    if (cards.length == 0) {
        section.replaceChildren(noEls);
    }

    // Add go page
    cards.forEach(el => {
        section.innerHTML += `<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
        <div class="card-body">
            <p class="card-text">${el.title}</p>
        </div>
        <img class="card-image" src="${el.img}" alt="Card image cap">
        <a class="btn" href="" id="${el._id}">Details</a>
    </div>`
    });


    // Add click event
    section.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            ctx.sections.viewCard(ctx, e.target.id)
            ctx.setNavBar();
        })
    })
}