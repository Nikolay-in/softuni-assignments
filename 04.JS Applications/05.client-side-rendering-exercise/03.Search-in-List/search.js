import { towns } from './towns.js';

const townsDiv = document.getElementById('towns');
let ul = document.createElement('ul');
townsDiv.appendChild(ul);

const button = document.querySelector('button');
button.addEventListener('click', search);

towns.forEach(town => {
   const li = document.createElement('li');
   li.textContent = town
   ul.appendChild(li);
})

function search() {

   let term = document.getElementById('searchText').value;
   let items = Array.from(document.getElementsByTagName('li'));
   let matches = 0;

   items.forEach(item => item.classList.remove('active'));

   for (let i = 0; i < items.length; i++) {
      if (items[i].textContent.match(term)) {

         matches++;

         items[i].classList.add('active');
      }
   }

   document.getElementById('result').textContent = matches + ' matches found';
}