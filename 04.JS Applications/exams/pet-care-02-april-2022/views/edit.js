import { html } from '../utils.js';
import { get, put } from '../services/api.js';

const template = (onSubmit, pet) => html`
<section id="editPage">
    <form class="editForm" @submit=${onSubmit}>
        <img src=${pet.image}>
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value=${pet.name}>
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" value=${pet.breed}>
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value=${pet.age}>
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value=${pet.weight}>
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value=${pet.image}>
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>
`;

export async function editView(ctx) {

    // Get pet info
    const pet = await get('/data/pets/' + ctx.params.id);
    ctx.render(template(onSubmit, pet));
    ctx.setNavBar();
    
    // Edit functionality
    async function onSubmit(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        const checkForEmptyField = Object.entries(formData).some(checkField);
        
        function checkField(field) {
            if (field[1] == '') {
                return true;
            }
        }
        
        if (checkForEmptyField) {
            return alert('All fields are required.');
        }

        await put('/data/pets/' + ctx.params.id, formData);

        ctx.page.redirect('/details/' + ctx.params.id);
    }
}