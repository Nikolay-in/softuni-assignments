export async function post(id) {
    let container = document.querySelector('div.container');

    let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + id);

    if (response.status == '200') {

        let data = await response.json();
        const post = `<div class="header">
                <img src="./static/profile.png" alt="avatar">
                <p><span>${data.userName}</span> posted on <time>2020-10-10 12:08:28</time></p>

                <p class="post-content">${data.postContent}</p>
            </div>`;

        let comments = [];

        let res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');

        if (res.status == '200') {

            let commData = await res.json();
             
            commData = Object.values(commData);
            
            // Filter only needed comments
            commData = commData.filter(e => e.postId == data._id);

            if (commData.length > 0) {
                comments = commData.map(el => 
                    `<div id="user-comment">
                        <div class="topic-name-wrapper">
                            <div class="topic-name">
                                <p><strong>${el.username}</strong> commented on <time>3/15/2021, 12:39:02 AM</time></p>
                                <div class="post-content">
                                    <p>${el.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>`
                );
            }

        } else {
            alert(res.statusText);
        }

        container.innerHTML = `
        <div class="theme-content">
            <!-- theme-title  -->
            <div class="theme-title">
                <div class="theme-name-wrapper">
                    <div class="theme-name">
                        <h2>${data.title}</h2>

                    </div>

                </div>
            </div>
            <div class="comment">
            ${post}
            ${comments.join('')}
            </div>
            <div class="answer-comment">
                <p><span>currentUser</span> comment:</p>
                <div class="answer">
                    <form>
                        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                        <div>
                            <label for="username">Username <span class="red">*</span></label>
                            <input type="text" name="username" id="username">
                        </div>
                        <button id="${data._id}">Post</button>
                    </form>
                </div>
            </div>
        </div>`;

        
        let [content, user] = document.querySelectorAll('textarea, input');
        let postBtn = document.querySelector('button');

        postBtn.addEventListener('click', async (e) => { 
            e.preventDefault();
            if (content.value && user.value) {

                let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
                    method: 'post', 
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        postId: e.target.id,
                        username: user.value,
                        content: content.value
                    })
                });

                if (response.ok) {

                    let commentSection = document.querySelector('div.comment');
                    commentSection.innerHTML += `<div id="user-comment">
                    <div class="topic-name-wrapper">
                        <div class="topic-name">
                            <p><strong>${user.value}</strong> commented on <time>3/15/2021, 12:39:02 AM</time></p>
                            <div class="post-content">
                                <p>${content.value}</p>
                            </div>
                        </div>
                    </div>
                </div>`

                } else {
                    alert(response.statusText)
                }

            } else {
                alert('All fields are required');
            }

    
        });

    } else {
        alert(response.statusText);
    }
}