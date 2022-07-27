import { getMyPosts } from "../services/data.js";
import { html, nothing } from "../utils.js";

const template = (allPosts) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    <div class="my-posts">
    ${allPosts.length > 0 
    ? allPosts.map(postTemplate)
    : nothing }
    </div>

    ${allPosts.length == 0 ? html `<h1 class="title no-posts-title">You have no posts yet!</h1>` : nothing}
</section>`;

const postTemplate = (post) => html`
<div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src="${post.imageUrl}" alt="Material Image">
    <div class="btn-wrapper">
        <a href="/details/${post._id}" class="details-btn btn">Details</a>
    </div>
</div>`

export async function myPostsView(ctx) {
    const allPosts = await getMyPosts();

    ctx.render(template(allPosts));
    ctx.setNavBar();
}