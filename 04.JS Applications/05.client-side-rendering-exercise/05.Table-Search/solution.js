import { createRows } from './rowTemplate.js';
import { get } from './api.js';
import { render } from './node_modules/lit-html/lit-html.js';

// Tbody
const tbody = document.querySelector('tbody');

// Get data
const data = await get();

// Create template from data
const template = createRows(data);

// Render data
render(template, tbody);


// Search functionality
document.querySelector('#searchBtn').addEventListener('click', onClick);
const searchField = document.getElementById('searchField');

function onClick() {
   if (searchField.value == '') {
      return;
   }

   const rows = Array.from(document.querySelectorAll('table tbody tr'));

   // Reset selected
   rows.forEach(r => r.classList.remove('select'));
   
   // Search rows
   rows.forEach(r => {
      if (r.textContent.toLocaleLowerCase().includes(searchField.value.toLocaleLowerCase())) {
         r.classList.add('select');
      }
   });

   // Reset search
   searchField.value = '';
}