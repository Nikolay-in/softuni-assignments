import { html } from "../utils.js";

const template = () => html`
<section id="main">
    <div id="welcome-container">
        <h1>Welcome To Car Tube</h1>
        <img class="hero" src="/images/car-png.webp" alt="carIntro">
        <h2>To see all the listings click the link below:</h2>
        <div>
            <a href="/all" class="button">Listings</a>
        </div>
    </div>
</section>
`;

export const homeView = (ctx) => {

    ctx.render(template());
}