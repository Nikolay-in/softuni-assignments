function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let term = document.getElementById('searchField').value;
      let rows = document.getElementsByTagName('tr');
      for (let i = 0; i < rows.length; i++) {
         if (rows[i].classList.contains('select')) {
            rows[i].classList.remove('select');
         }
      }
      for (let i = 0; i < rows.length; i++) {
         let cells = Array.from(rows[i].children);
         for (let cell of cells) {
            if (cell.textContent.match(term)) {
               rows[i].classList.add('select');
            }
         }
      }
   }
}