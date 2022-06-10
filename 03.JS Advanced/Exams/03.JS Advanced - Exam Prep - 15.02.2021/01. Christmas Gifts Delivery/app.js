function solution() {
    let addBtn = document.querySelector('button');
    addBtn.addEventListener('click', addGift);

    function addGift(e) {
        //Create li
        let input = e.target.previousElementSibling;
        let li = document.createElement('li');
        li.textContent = input.value;
        li.className = 'gift';

        //Add buttons
        let sendButton = document.createElement('button');
        let discardButton = document.createElement('button');
        sendButton.id = 'sendButton';
        discardButton.id = 'discardButton';
        sendButton.textContent = 'Send';
        discardButton.textContent = 'Discard';
        li.appendChild(sendButton);
        li.appendChild(discardButton);

        sendButton.addEventListener('click', (e) => {
            sendButton.remove();
            discardButton.remove();
            let sentGifts = document.querySelectorAll('section ul')[1];
            sentGifts.appendChild(li);
        });

        discardButton.addEventListener('click', (e) => {
            sendButton.remove();
            discardButton.remove();
            let sentGifts = document.querySelectorAll('section ul')[2];
            sentGifts.appendChild(li);
        });

        let ul = document.querySelector('section.card > ul');
        ul.appendChild(li);
        input.value = '';

        //Sort items
        let parent = document.querySelector('section.card ul');
        let lis = Array.from(document.querySelectorAll('section.card li'));
        lis.sort((a, b) => a.textContent.localeCompare(b.textContent));
        lis.forEach(el => {
            parent.removeChild(el);
            parent.appendChild(el);
        });
    }
}