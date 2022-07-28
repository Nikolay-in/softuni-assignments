import { getUserInfo, html, nothing } from '../utils.js';
import { get, del } from '../services/api.js';
import { getUserDonations, getDonations, sendDonation } from '../services/user.js';

const template = (pet, onDelete, onDonate) => {
    const userData = getUserInfo();


    return html`
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src="${pet.image}">
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${pet.name}</h1>
                    <h3>Breed: ${pet.breed}</h3>
                    <h4>Age: ${pet.age}</h4>
                    <h4>Weight: ${pet.weight}</h4>
                    <h4 class="donation">Donation: ${Number(pet.donations) * 100}$</h4>
                </div>
                <!-- if there is no registered user, do not display div-->
                ${ userData 
                ? html `<div class="actionBtn">
                    <!-- Only for registered user and creator of the pets-->
                    ${userData.id == pet._ownerId 
                    ? html `
                        <a href="/edit/${pet._id}" class="edit">Edit</a>
                        <a href="javascript:void(0);" @click=${() => onDelete(pet._id)} class="remove">Delete</a>`
                    : nothing}
                    <!--(Bonus Part) Only for no creator and user-->
                    ${ userData && userData.id !== pet._ownerId && pet.userDonations == 0
                    ? html `<a href="javascript:void(0);" @click=${(e) => onDonate(e, pet._id)} class="donate">Donate</a>`
                    : nothing
                    }
                    </div>`
                : nothing
                }
                
            </div>
        </div>
    </section>`
}

export async function detailsView(ctx) {

    const pet = await get('/data/pets/' + ctx.params.id);

    pet.donations = await getDonations(pet._id);

    pet.userDonations = await getUserDonations(pet._id);

    ctx.render(template(pet, onDelete, onDonate));
    ctx.setNavBar();

    async function onDelete(id) {
        const confirmation = confirm('Are you sure you want to delete this pet?');

        if (confirmation) {
            await del('/data/pets/' + id);
            ctx.page.redirect('/');
        }
    }

    async function onDonate(e, id) {
        e.target.style.display = 'none';
        await sendDonation(id);
        pet.donations++;
        ctx.render(template(pet, onDelete, onDonate));
    }
}