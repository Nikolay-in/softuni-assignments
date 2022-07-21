import { post } from './post.js';


let [title, username, text] = document.querySelectorAll('input, textarea');
let [cancelBtn, postBtn] = document.querySelectorAll('button');
let main = document.querySelector('main');

// Load all posts on load
document.addEventListener('DOMContentLoaded', async () => {

    let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');

    if (response.ok) {
        let data = await response.json();
        let posts = Object.values(data);

        posts.forEach(data => {

            let topicContainer = document.createElement('div');
            topicContainer.className = 'topic-container';
            main.appendChild(topicContainer);

            let topicNameWrapper = document.createElement('div');
            topicNameWrapper.className = 'topic-name-wrapper';
            topicContainer.appendChild(topicNameWrapper);

            let topicName = document.createElement('div');
            topicName.className = 'topic-name';
            topicNameWrapper.appendChild(topicName);

            let a = document.createElement('a');
            a.href = '#';
            a.className = 'normal';
            a.id = data._id;
            topicName.appendChild(a);

            let h2 = document.createElement('h2');
            h2.textContent = data.title;
            a.appendChild(h2);

            let columns = document.createElement('div');
            columns.className = 'columns';
            topicName.appendChild(columns);

            let div = document.createElement('div');
            columns.appendChild(div);

            let p = document.createElement('p');
            p.textContent = 'Date: ';
            div.appendChild(p);

            let time = document.createElement('time');
            time.textContent = '2020-10-10T12:08:28.451Z';
            p.appendChild(time);


            let nickName = document.createElement('div');
            nickName.className = 'nick-name';
            div.appendChild(nickName);

            let p2 = document.createElement('p');
            p2.textContent = 'Username: ';
            nickName.appendChild(p2);

            let span = document.createElement('span');
            span.textContent = data.username;
            p2.appendChild(span);

        });

    } else {
        alert(response.statusText);
    }

})

// Post btn functionality
postBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (title.value && username.value && text.value) {
        let postObject = {
            "title": title.value,
            "username": username.value,
            "content": text.value
        }

        let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postObject)
        });

        if (response.ok) {
            let data = await response.json();
            main.innerHTML += `<div class="topic-container">
                                        <div class="topic-name-wrapper">
                                            <div class="topic-name">
                                                <a href="#" class="normal" id="${data._id}">
                                                    <h2>${data.title}</h2>
                                                </a>
                                                <div class="columns">
                                                    <div>
                                                        <p>Date: <time>2020-10-10T12:08:28.451Z</time></p>
                                                        <div class="nick-name">
                                                            <p>Username: <span>${data.username}</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;

        } else {
            alert(response.statusText);
        }

    } else {
        alert('All fields are required.')
    }
});

// Cancel btn functionality
cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    [title, username, text].forEach(el => el.value = '');
});

// Link post click functionality
main.addEventListener('click', (e) => {
    if (e.target.parentElement.tagName == 'A') {
        e.preventDefault();

        // Call post module with the selected id
        post(e.target.parentElement.id);
    }
});