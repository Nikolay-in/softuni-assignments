import { cats } from "./catSeeder.js";

const allCats = document.getElementById('allCats');
const ul = document.createElement('ul');
allCats.appendChild(ul);

// Add element for each cat
cats.forEach(cat => {
    const template = `<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                        <div class="info">
                            <button class="showBtn">Show status code</button>
                            <div class="status" style="display: none" id="100">
                                <h4>Status Code: ${cat.statusCode}</h4>
                                <p>${cat.statusMessage}</p>
                            </div>
                        </div>
                    </li>`;
    ul.innerHTML += template;
});

// Click event handler
allCats.addEventListener('click', showStatus)

function showStatus(e) {
    if (e.target.tagName === 'BUTTON') {
        const status = e.target.nextElementSibling;
        status.style.display === 'none' ? status.style.display = '' : status.style.display = 'none';
    }
}