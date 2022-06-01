function addItem() {
    let input = document.querySelector('input#newItemText');
    let inputText = input.value;
    let li = document.createElement('li');
    li.textContent = inputText;
    let delButton = document.createElement('a');
    delButton.href = '#';
    delButton.textContent = '[Delete]';
    delButton.addEventListener('click', del);
    li.appendChild(delButton);

    document.querySelector('ul#items').appendChild(li);
    input.value = '';

    function del(e) {
        e.target.parentElement.remove();
    }
}