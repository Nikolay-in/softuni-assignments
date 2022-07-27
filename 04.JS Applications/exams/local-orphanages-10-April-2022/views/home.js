import { getAllPosts } from "../services/data.js";
import { html, nothing } from "../utils.js";

const template = (allPosts) => html`
    <section id="dashboard-page">
        <h1 class="title">All Posts</h1>
        <div class="all-posts">
        ${allPosts.length   > 0 
            ? allPosts.map(singlePost)
            : nothing }
        </div>
            
        ${allPosts.length == 0 ? html`<h1 class="title no-posts-title">No posts yet!</h1>` : nothing}
    </section>`;


const singlePost = (post) => html`
<div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src="${post.imageUrl}" alt="${post.title}">
    <div class="btn-wrapper">
        <a href="/details/${post._id}" class="details-btn btn">Details</a>
    </div>
</div>`


export async function homeView(ctx) {
    const allPosts = await getAllPosts();

    ctx.render(template(allPosts));
    ctx.setNavBar();
}