import { get, del } from "../api.js";

const section = document.body.children[2];
section.remove();

const delBtn = section.querySelector('a');
delBtn.remove()

// Del button parent
const delBtnParent = section.querySelector('div.text-center');

export async function viewCard(ctx, id) {
    document.body.children[1].replaceWith(section);

    // Get card info
    const card = await get('/data/ideas/' + id);

    //Check user
    const userData = JSON.parse(localStorage.getItem('userData'))

    //Clone del btn, apply new in order not to stack event listeners (event listener needs ctx)
    const newDelBtn = delBtn.cloneNode(true);

    if (userData && userData.id == card._ownerId) {
        delBtnParent.replaceChildren();
        newDelBtn.id = card._id;
        delBtnParent.appendChild(newDelBtn);
    } else {
        delBtnParent.replaceChildren();
    }

    // Visualize
    const img = section.querySelector('img');
    img.src = card.img;

    const h2 = section.querySelector('h2');
    h2.textContent = card.title;

    const desc = section.querySelector('p.idea-description');
    desc.textContent = card.description;

    // Delete functionality
    newDelBtn.addEventListener('click', async (e) => { 
        e.preventDefault();

        const res = await del('/data/ideas/' + e.target.id);

        ctx.sections.dashboard(ctx)
        ctx.setNavBar('dashboard');
    });
}