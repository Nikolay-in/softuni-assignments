document.addEventListener('DOMContentLoaded', getRecipes);

// Get recipes preview
async function getRecipes() {
    try {
        const response = await fetch('http://localhost:3030/jsonstore/cookbook/recipes');
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        
        const data = await response.json();
        const recipes = Object.values(data);

        //Get and clear main tag
        let main = document.querySelector('main');
        main.innerHTML = '';
        
        // Create preview for each recipe
        for (let recipe of recipes) {
            // Create article
            let article = document.createElement('article');
            article.className = 'preview';
            article.id = recipe._id;

            //Add click handler to the preview
            article.addEventListener('click', clickPreview);

            // Div title
            let divTitle = document.createElement('div');
            divTitle.className = 'title';
            article.appendChild(divTitle);

            // h2 title
            let h2Title = document.createElement('h2');
            h2Title.textContent = recipe.name;
            divTitle.appendChild(h2Title);

            // Div small
            let divSmall = document.createElement('div');
            divSmall.className = 'small';
            article.appendChild(divSmall);

            // img
            let img = document.createElement('img');
            img.src = recipe.img
            divSmall.appendChild(img);

            // Append article to main
            main.appendChild(article);
        }

    } catch(e) {
        console.log(e);
    }
}

// Preview click handler
function clickPreview(e) {

    // Continue only if it is not toggled already
    if (e.currentTarget.classList.contains('preview')) {
        let target = e.currentTarget;
        fetch('http://localhost:3030/jsonstore/cookbook/details/' + e.currentTarget.id)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            
            return res.json();
        })
        .then(data => toggleRecipe(target, data))
        .catch(e => console.log(e))
        console.log('test');
    }
}

function toggleRecipe(target, data) {

    // Remove class once it is toggled
    target.removeAttribute('class');
    target.innerHTML = `
        <h2>${data.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src="${data.img}">
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${data.ingredients.map(el => `<li>${el}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${data.steps.map(el => `<p>${el}</p>`).join('')}
        </div>`;
}