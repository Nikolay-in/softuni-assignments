import { get, post } from './api.js';
import { createOpt } from './engine.js';
import { render } from './node_modules/lit-html/lit-html.js';

const select = document.getElementById('menu');
const input = document.getElementById('itemText');
const addBtn = document.querySelector('input[type="submit"]')

// Get initial items
let items = await get();
// Render
render(items.map(createOpt), select);

// Add button functionality
addBtn.addEventListener('click', onAdd);

async function onAdd(e) {
    e.preventDefault();
    
    if (input.value == '') {
        return;
    }

    const result = await post(input.value)

    items.push(result);
    render(items.map(createOpt), select);
    input.value = '';
}


