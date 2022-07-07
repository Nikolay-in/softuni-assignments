function attachEvents() {
    //Get DOM elements
    let postsSelect = document.querySelector('select#posts');
    let btnLoadPosts = document.getElementById('btnLoadPosts');
    let btnViewPost = document.getElementById('btnViewPost');
    let postTitle = document.getElementById('post-title');
    let postContent = document.getElementById('post-body');


    //Add event listeners
    btnLoadPosts.addEventListener('click', handleLoadPosts);
    btnViewPost.addEventListener('click', handleViewPost)


    function handleLoadPosts() {
        //Get posts
        fetch('http://localhost:3030/jsonstore/blog/posts')
        .then(res => res.json())
        .then(data => addPosts(data));

        function addPosts(data) {
            postsSelect.innerHTML = '';
            
            for (let [id, postInfo] of Object.entries(data)) {
                //Create option
                let option = document.createElement('option');
                option.value = id;
                option.textContent = postInfo.title;
                postsSelect.appendChild(option);
            }
            handleViewPost();
        }
    }

    function handleViewPost() {
        //Get post id
        let selectedPostId = document.getElementById('posts').value;

        //Fetch post data
        fetch('http://localhost:3030/jsonstore/blog/posts/' + selectedPostId)
        .then(res => res.json())
        .then(data => {
            postTitle.textContent = data.title;
            postContent.textContent = data.body;
        });

        //Fetch comments
        fetch('http://localhost:3030/jsonstore/blog/comments')
        .then(res => res.json())
        .then(data => handleComments(data));

        //Handle comments
        function handleComments(data) {
            let commentsUl = document.getElementById('post-comments');
            commentsUl.innerHTML = '';
            
            for (let [commentId, commentInfo] of Object.entries(data)) {
                if (commentInfo.postId == selectedPostId) {
                    //Create comment li
                    let li = document.createElement('li');
                    li.id = commentInfo.id
                    li.textContent = commentInfo.text;
                    commentsUl.appendChild(li);
                }
            }
        }
    }
}

attachEvents();