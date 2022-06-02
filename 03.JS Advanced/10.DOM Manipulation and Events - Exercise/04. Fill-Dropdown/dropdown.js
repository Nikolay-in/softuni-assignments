function addItem() {
    let text = document.getElementById('newItemText');
    let value = document.getElementById('newItemValue');
    let option = document.createElement('option');
    option.textContent = text.value;
    option.value = value.value;
    document.getElementById('menu').appendChild(option);
    text.value = '';
    value.value = '';
}