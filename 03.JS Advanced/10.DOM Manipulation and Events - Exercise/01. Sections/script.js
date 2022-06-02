function create(words) {
   let divs = [];
   for (let word of words) {
      let div = document.createElement('div');
      let p = document.createElement('p');
      p.textContent = word;
      p.style.display = 'none';
      div.appendChild(p);
      div.addEventListener('click', showP);
      divs.push(div);
   }
   function showP(e) {
      e.target.querySelector('p').style.display = 'block';
   }
   divs.forEach(e => document.querySelector('#content').appendChild(e));
}