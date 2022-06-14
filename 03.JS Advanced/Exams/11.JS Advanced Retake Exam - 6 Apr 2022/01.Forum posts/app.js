window.addEventListener("load", solve);

function solve() {
  let [title, category, postContent] = document.querySelectorAll('div#newPost input, div#newPost textarea');
  let publishBtn = document.getElementById('publish-btn');
  let reviewList = document.querySelector('ul#review-list');
  let publishedList = document.querySelector('ul#published-list');
  let clearBtn = document.getElementById('clear-btn');

  publishBtn.addEventListener('click', onPublish);
  clearBtn.addEventListener('click', onClear);

  function createTag(tag, text = null, className = null, id = null, type = null) {
    let el = document.createElement(tag);
    if (text) {
        el.textContent = text;
    }
    if (type) {
        el.type = type;
    }
    if (id) {
        el.id = id;
    }
    if (className) {
        el.className = className;
    }
    return el;
}

  function onPublish() {
    if (title.value && category.value && postContent.value) {
      let li = createTag('li', null, 'rpost');
      let article = document.createElement('article');
      article.appendChild(createTag('h4', title.value));
      article.appendChild(createTag('p', 'Category: ' + category.value));
      article.appendChild(createTag('p', 'Content: ' + postContent.value));
      li.appendChild(article);
      let editBtn = createTag('button', 'Edit', 'action-btn edit');
      li.appendChild(editBtn);// 
      let approveBtn = createTag('button', 'Approve', 'action-btn approve');
      li.appendChild(approveBtn);
      editBtn.addEventListener('click', onEdit);
      approveBtn.addEventListener('click', onApprove);
      [title, category, postContent].forEach(el => el.value = '');
      reviewList.appendChild(li);
    }
  }

  function onEdit(e) {
    let postTitle = e.target.previousElementSibling.children[0].textContent;
    let postCategory = e.target.previousElementSibling.children[1].textContent.replace('Category: ', '');
    let postText = e.target.previousElementSibling.children[2].textContent.replace('Content: ', '');

    title.value = postTitle
    category.value = postCategory
    postContent.value = postText

    e.target.parentElement.remove();
  }
  
  function onApprove(e) {
    publishedList.appendChild(e.target.parentElement);
    e.target.previousElementSibling.remove();
    e.target.remove();
  }

  function onClear() {
    Array.from(publishedList.children).forEach(el => el.remove());
  }
}