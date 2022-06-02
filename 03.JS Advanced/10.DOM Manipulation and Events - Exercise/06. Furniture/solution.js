function solve() {
  let textArea1 = document.querySelectorAll('textarea')[0];
  let textArea2 = document.querySelectorAll('textarea')[1];
  let generateButton = document.querySelectorAll('button')[0];
  let buyButton = document.querySelectorAll('button')[1];
  let tbody = document.querySelector('table.table tbody');

  generateButton.addEventListener('click', generateList);
  buyButton.addEventListener('click', buyList);

  function generateList(e) {
    let list = JSON.parse(textArea1.value);
    for (el of list) {
      let tr = document.createElement('tr');
      for (let i = 0; i < 5; i++) {
        let td = document.createElement('td');
        if (i > 0 && i < 4) {
          let p = document.createElement('p');
          td.appendChild(p);
        }
        tr.appendChild(td);
      }
      let tds = Array.from(tr.querySelectorAll('td'));
      //Add img
      let img = document.createElement('img');
      img.src = el.img;
      tds[0].appendChild(img);
      //Add Name
      tds[1].querySelector('p').textContent = el.name;
      //Add Price
      tds[2].querySelector('p').textContent = el.price;
      //Add Decoration Factor
      tds[3].querySelector('p').textContent = el.decFactor;
      //Add checkbox
      let cBox = document.createElement('input');
      cBox.type = 'checkbox';
      tds[4].appendChild(cBox);
      //Append tr
      tbody.appendChild(tr);
    }
  }

  function buyList(e) {
    let cBoxes = Array.from(document.querySelectorAll('table.table tbody input[type="checkbox"]:checked'));
    let items = [];
    let totalPrice = 0;
    let decFactor = 0;
    for (box of cBoxes) {
      let tr = box.parentElement.parentElement;
      let ps = tr.querySelectorAll('p');
      items.push(ps[0].textContent);
      totalPrice += Number(ps[1].textContent);
      decFactor += Number(ps[2].textContent);
    }
    items = items.join(', ');
    let output = `Bought furniture: ${items}\nTotal price: ${totalPrice.toFixed(2)}\nAverage decoration factor: ${(decFactor / cBoxes.length)}`;
    textArea2.value = output;
  }
}