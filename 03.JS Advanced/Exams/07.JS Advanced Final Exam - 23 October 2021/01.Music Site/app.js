window.addEventListener('load', solve);

function solve() {
    let [genre, name, author, date] = Array.from(document.querySelectorAll('section#append-song form input'));
    let addBtn = document.getElementById('add-btn');
    let hitsContainer = document.querySelector('div.all-hits-container');
    let savedContainer = document.querySelector('div.saved-container');
    let likes = document.querySelector('div.likes p');

    function createTag(tag, text, className = null) {
        let el = document.createElement(tag);
        if (text != '') {
            el.textContent = text;
        }
        if (className) {
            el.className = className;
        }
        return el;
    }

    addBtn.addEventListener('click', onAdd);

    function onAdd(e) {
        e.preventDefault();
        if (genre.value && name.value && author.value && date.value) {
            //Main div
            let div = createTag('div', '', 'hits-info');
            //img
            let img = document.createElement('img');
            img.src = './static/img/img.png';
            div.appendChild(img);
            //Genre, name, author
            let strings = ['Genre: ', 'Name: ', 'Author: '];
            [genre.value, name.value, author.value].forEach((el, i) => {
                let h2 = createTag('h2', strings[i] + el);
                div.appendChild(h2);
            });
            //Date
            div.appendChild(createTag('h3', 'Date: ' + date.value));
            let saveBtn = createTag('button', 'Save song', 'save-btn');
            div.appendChild(saveBtn);
            let likeBtn = createTag('button', 'Like song', 'like-btn');
            div.appendChild(likeBtn);
            let delBtn = createTag('button', 'Delete', 'delete-btn');
            div.appendChild(delBtn);
            //Finish
            hitsContainer.appendChild(div);

            saveBtn.addEventListener('click', onSave);
            likeBtn.addEventListener('click', onLike);
            delBtn.addEventListener('click', onDel);
            [genre, name, author, date].forEach(el => el.value = '');
        }
    }

    function onSave(e) {
        savedContainer.appendChild(e.target.parentElement);
        e.target.nextElementSibling.remove();
        e.target.remove();
    }

    function onLike(e) {
        let likesCount = Number(likes.textContent.split(': ')[1]);
        likesCount++;
        likes.textContent = 'Total Likes: ' + likesCount;
        e.target.disabled = true;
    }

    function onDel(e) {
        e.target.parentElement.remove();
    }
}