import { get, del } from "../services/api.js";
import { getDonations, getUserDonations, sendDonation } from "../services/user.js";
import { getUserInfo, html, nothing } from "../utils.js";

const template = (post, onDelete, onDonate) => {
const userInfo = getUserInfo();

return html`
<section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src="${post.imageUrl}" alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${post.title}</h2>
                        <p class="post-description">Description: ${post.description}</p>
                        <p class="post-address">Address: ${post.address}</p>
                        <p class="post-number">Phone number: ${post.phone}</p>
                        <p class="donate-Item">Donate Materials: ${post.donations}</p>

                        <div class="btns">
                            ${userInfo?.id == post._ownerId 
                            ? html `<a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                                    <a href="javascript:void(0);" @click=${() => onDelete(post._id)} class="delete-btn btn">Delete</a>`
                            : nothing
                            }
                            
                            ${userInfo && userInfo.id != post._ownerId && post.myDonations == 0
                            ? html `<a href="javascript:void(0);" id=${post._id} @click=${onDonate} class="donate-btn btn">Donate</a>`
                            : nothing
                            }
                            
                        </div>

                    </div>
                </div>
            </div>
        </section>`};


export async function detailsView(ctx) {
    const post = await get('/data/posts/' + ctx.params.id);

    const donations = await getDonations(ctx.params.id);
    post.donations = donations;

    post.myDonations = 0;
    if (getUserInfo()) {
        const myDonations = await getUserDonations(ctx.params.id);
        post.myDonations = myDonations;
    }

    function onDonate(e) {
        e.target.style.display = 'none';
        sendDonation(e.target.id);
        post.donations = Number(post.donations) + 1;
        post.myDonations++;
        ctx.render(template(post, onDelete, onDonate));
    }


    ctx.render(template(post, onDelete, onDonate));
    ctx.setNavBar();

    async function onDelete(id) {
        const confirmation = confirm('Are you sure you want to delete this post?');

        if (confirmation == true) {
            await del('/data/posts/' + id);

            ctx.page.redirect('/');
        }
    }
}