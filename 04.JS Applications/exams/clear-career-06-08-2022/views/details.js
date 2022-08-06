import { del, get, post } from "../services/api.js";
import { getUserInfo, html, nothing } from "../utils.js";

const template = (offer, userInfo, onDelete, onApply) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
              Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
              </div>
            </div>
            <p>Applications: <strong id="applications">${offer.applications}</strong></p>

            <!--Edit and Delete are only for creator-->
            ${ userInfo && offer._ownerId == userInfo.id
                ? html `
                <div id="action-buttons">
                    <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                    <a href="javascript:void(0)" id="delete-btn" @click=${() => onDelete(offer._id)}>Delete</a>
                </div>
                `
                : nothing
            }

            <!--Bonus - Only for logged-in users ( not authors )-->
            ${ userInfo && offer._ownerId !== userInfo.id && userInfo.applications == 0
                ? html `
                <div id="action-buttons">
                    <a href="javascript:void(0)" id="apply-btn" @click=${(e) => onApply(e, offer._id)}>Apply</a>
                </div>
                `
                : nothing
            }
          </div>
        </section>`;

export async function detailsView(ctx) {

    const offer = await get('/data/offers/' + ctx.params.id);

    offer.applications = await get(`/data/applications?where=offerId%3D%22${ctx.params.id}%22&distinct=_ownerId&count`);

    const userInfo = getUserInfo();

    if (userInfo) {
      userInfo.applications =  await get(`/data/applications?where=offerId%3D%22${ctx.params.id}%22%20and%20_ownerId%3D%22${userInfo.id}%22&count`)
    }

    ctx.render(template(offer, userInfo, onDelete, onApply));

    async function onDelete(id) {
        const confirmation = confirm('Are you sure you want to delete offer?');

        if (confirmation) {
            await del('/data/offers/' + id);
            ctx.page.redirect('/dashboard')
        }
    }

    function onApply(ev, offerId) {
        ev.target.style.display = 'none';

        offer.applications = Number(offer.applications) + 1;
        userInfo.applications = Number(userInfo.applications) + 1;

        ctx.render(template(offer, userInfo, onApply));

        post('/data/applications', {offerId});
    }
}