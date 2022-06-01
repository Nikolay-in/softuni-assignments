function addItem() {
    let input = document.querySelector('input#newItemText');
    let inputText = input.value;
    let li = document.createElement('li');
    li.textContent = inputText;
    document.querySelector('ul#items').appendChild(li);
    input.value = '';
}