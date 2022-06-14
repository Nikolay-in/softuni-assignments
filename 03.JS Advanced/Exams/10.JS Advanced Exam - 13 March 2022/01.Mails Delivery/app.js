function solve() {
    let [name, title, message] = document.querySelectorAll('form input, form textarea');
    let listMails = document.querySelector('div.list-mails ul#list');
    let sentMails = document.querySelector('div.sent-mails ul.sent-list');
    let deletedMails = document.querySelector('div.trash ul.delete-list');
    let addBtn = document.querySelector('button#add');
    let resetBtn = document.querySelector('button#reset');

    function createTag(tag, text, id = null, type = null) {
        let el = document.createElement(tag);
        if (text != '') {
            el.textContent = text;
        }
        if (type) {
            el.type = type;
        }
        if (id) {
            el.id = id;
        }
        return el;
    }

    addBtn.addEventListener('click', onAdd);
    resetBtn.addEventListener('click', onReset);

    function onAdd(e) {
        e.preventDefault();
        if (name.value && title.value && message.value) {
            //Main li
            let li = document.createElement('li');
            
            //Info
            li.appendChild(createTag('h4', 'Title: ' + title.value));
            li.appendChild(createTag('h4', 'Recipient Name: ' + name.value));
            li.appendChild(createTag('span', message.value));
            
            //Buttons
            let submitBtn = createTag('button', 'Send', 'send', 'submit');
            let deletetBtn = createTag('button', 'Delete', 'delete', 'submit');
            let div = createTag('div', '', 'list-action');
            div.appendChild(submitBtn);
            submitBtn.addEventListener('click', onSubmit);
            div.appendChild(deletetBtn);
            deletetBtn.addEventListener('click', onDelete);
            li.appendChild(div);

            //Append main li
            listMails.appendChild(li);
            [name, title, message].forEach(el => el.value = '');
        }
    }

    function onReset(e) {
        e.preventDefault();
        [name, title, message].forEach(el => el.value = '');
    }

    function onSubmit(e) {
        let li = e.target.parentElement.parentElement;
        sentMails.appendChild(li);

        let newLi = document.createElement('li');
        let recipient = li.children[1].textContent;
        recipient = recipient.replace('Recipient Name', 'To');
        let spanRecipient = createTag('span', recipient);
        let spanTitle = createTag('span', li.children[0].textContent);

        let div = document.createElement('div');
        div.className = 'btn';
        let delBtn = document.createElement('button');
        delBtn.type = 'submit';
        delBtn.className = 'delete';
        delBtn.textContent = 'Delete';
        div.appendChild(delBtn);    
        delBtn.addEventListener('click', onDelete);

        newLi.appendChild(spanRecipient);
        newLi.appendChild(spanTitle);
        newLi.appendChild(div);

        sentMails.appendChild(newLi);

        e.target.parentElement.parentElement.remove();
    }

    function onDelete(e) {
        let li = e.target.parentElement.parentElement;
        deletedMails.appendChild(li);

        if (li.children.length == 4) {
            //New To:
            let newToText = li.children[1].textContent;
            newToText = newToText.replace('Recipient Name', 'To');
            let toSpan = createTag('span', newToText);
            let titleSpan = createTag('span', li.children[0].textContent);
    
            li.children[0].remove();
            li.children[0].remove();
            li.children[0].remove();
            e.target.parentElement.before(toSpan);
            e.target.parentElement.before(titleSpan);
        }
        e.target.parentElement.remove();
    }
}
solve()