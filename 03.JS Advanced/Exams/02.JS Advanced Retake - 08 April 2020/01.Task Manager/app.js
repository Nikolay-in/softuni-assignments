function solve() {
    let [_, open, inProgress, complete] = document.querySelectorAll('div.wrapper > section > div:nth-of-type(2)');

    let addBtn = document.querySelector('button#add');
    addBtn.addEventListener('click', add);

    function createTag(tag, className, info) {
        let newTag = document.createElement(tag);
        newTag.className = className;
        newTag.textContent = info;
        return newTag;
    }

    function add(e) {
        e.preventDefault();

        let task = document.querySelector('input#task');
        let description = document.querySelector('textarea#description');
        let date = document.querySelector('input#date');

        if (task.value && description.value && date.value) {
            let article = document.createElement('article');
            article.appendChild(createTag('h3', '', task.value));
            article.appendChild(createTag('p', '', 'Description: ' + description.value));
            article.appendChild(createTag('p', '', 'Due Date: ' + date.value));
            let div = createTag('div', 'flex', '');
            let startBtn = createTag('button', 'green', 'Start');
            let delBtn = createTag('button', 'red', 'Delete');
            let finishBtn = createTag('button', 'orange', 'Finish');
            div.appendChild(startBtn);
            div.appendChild(delBtn);

            article.appendChild(div);
            open.appendChild(article);
        
            startBtn.addEventListener('click', onStart);
            function onStart() {
                startBtn.remove();
                div.appendChild(finishBtn);
                inProgress.appendChild(article);
            }

            finishBtn.addEventListener('click', onFinish);
            function onFinish() {
                div.remove();
                complete.appendChild(article);
            }

            delBtn.addEventListener('click', onDelete);
            function onDelete() {
                article.remove();
            }
        }

        [task, description, date].forEach(el => el.value = '');
    }
}