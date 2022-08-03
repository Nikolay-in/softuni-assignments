import { get } from '../services/api.js';
import { getUserInfo, html } from '../utils.js';

const template = (profile) => {
    let profileImg = '';

    profile.gender == 'male' ? profileImg = '/images/male.png' : profileImg = '/images/female.png';

    return html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src=${profileImg}>
            <div class="user-content">
                <p>Username: ${profile.username}</p>
                <p>Email: ${profile.email}</p>
                <p>My memes count: ${profile.memes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${profile.memes.length > 0
                ? profile.memes.map(memeTemplate)
                : html`<p class="no-memes">No memes in database.</p>`
            }
        </div>
    </section>
    `;
}

const memeTemplate = (meme) => html`
        <div class="user-meme">
            <p class="user-meme-title">${meme.title}</p>
            <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
`

export async function myProfileView(ctx) {

    const profile = getUserInfo();
    profile.memes = await get(`/data/memes?where=_ownerId%3D%22${profile.id}%22&sortBy=_createdOn%20desc`);

    ctx.render(template(profile));
}