import { get } from "../services/api.js";
import { getUserInfo, html } from "../utils.js";

const template = (events, userInfo) => html`
    <section id="profilePage">
        <div class="userInfo">
            <div class="avatar">
                <img src="./images/profilePic.png">
            </div>
            <h2>${userInfo.email}</h2>
        </div>
        <div class="board">
            
            ${events.length > 0 
            ? html`
                <div class="eventBoard">
                ${events.map(eventTemplate)}
                </div>
                ` 
            : html`
            <div class="no-events">
                <p>This user has no events yet!</p>
            </div>`
            }
        
        </div>
    </section>
`;

const eventTemplate = (e) => html`
<div class="event-info">
    <img src=${e.imageUrl}>
    <h2>${e.title}</h2>
    <h6>${e.date}</h6>
    <a href="/details/${e._id}" class="details-button">Details</a>
</div>`

export async function profileView(ctx) {

    const userInfo = getUserInfo();

    const events = await get(`/data/theaters?where=_ownerId%3D%22${userInfo.id}%22&sortBy=_createdOn%20desc`)

    ctx.render(template(events, userInfo));
}