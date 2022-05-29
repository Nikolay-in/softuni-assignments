function search() {
   let term = document.getElementById('searchText').value;
   let items = document.getElementsByTagName('li');
   let matches = 0;
   for (let i = 0; i < items.length; i++) {
      items[i].innerHTML = items[i].textContent;
   }
   for (let i = 0; i < items.length; i++) {
      if (items[i].textContent.match(term)) {
         matches++;
         items[i].innerHTML = '<bold><u>' + items[i].textContent + '</bold></u>';
      }
   }
   document.getElementById('result').textContent = matches + ' matches found';
}
