window.addEventListener("load", solve);

function solve() {
  //Get Make, model, year, fuel, original-cost and selling price
  let [make, model, year, fuel, originalCost, sellPrice] = document.querySelectorAll('fieldset input, fieldset select');
  let publishBtn = document.getElementById('publish');
  let publishedTable = document.getElementById('table-body');
  let soldList = document.getElementById('cars-list');
  let profitField = document.getElementById('profit');

  //Button event
  publishBtn.addEventListener('click', publish);

  //Factory function
  function createTag(tag, text = null, className = null, id = null, type = null) {
    let el = document.createElement(tag);
    if (text) { el.textContent = text; }
    if (type) { el.type = type; }
    if (id) { el.id = id; }
    if (className) { el.className = className; }
    return el;
  }

  function publish(e) {
    e.preventDefault();

    //Check fields and sellPrice > originalCost (try >=)
    if (make.value && model.value && year.value && fuel.value && originalCost.value && sellPrice.value && Number(sellPrice.value) > Number(originalCost.value) ) {
      
      //Create table row
      let tr = createTag('tr', null, 'row');

      //Append info
      tr.appendChild(createTag('td', make.value));
      tr.appendChild(createTag('td', model.value));
      tr.appendChild(createTag('td', year.value));
      tr.appendChild(createTag('td', fuel.value));
      tr.appendChild(createTag('td', originalCost.value));
      tr.appendChild(createTag('td', sellPrice.value));
      
      //Create buttons
      let buttons = document.createElement('td');
      let editBtn = createTag('button', 'Edit', 'action-btn edit');
      buttons.appendChild(editBtn);
      let sellBtn = createTag('button', 'Sell', 'action-btn sell')
      buttons.appendChild(sellBtn);

      //Add functions
      editBtn.addEventListener('click', edit);
      sellBtn.addEventListener('click', sell);

      //Append buttons
      tr.appendChild(buttons);

      //Append tr
      publishedTable.appendChild(tr);

      //Clear fields
      [make, model, year, fuel, originalCost, sellPrice].forEach(el => el.value = '');
    }

    function sell(e) {
      //Get info
      let tds = Array.from(e.target.parentElement.parentElement.children);

      //Create li
      let li = createTag('li', null, 'each-list');

      //Append info
      li.appendChild(createTag('span', tds[0].textContent + ' ' + tds[1].textContent));
      li.appendChild(createTag('span', tds[2].textContent));
      let profit = Number(tds[5].textContent) - Number(tds[4].textContent);
      li.appendChild(createTag('span', profit));

      //Append li
      soldList.appendChild(li);

      //Update profit
      profitField.textContent = (Number(profitField.textContent) + profit).toFixed(2);

      //Remove tr
      e.target.parentElement.parentElement.remove();
    }

    function edit(e) {
      //Get tds
      let tds = Array.from(e.target.parentElement.parentElement.children);
      tds.pop();

      //Get fields
      let fields = [make, model, year, fuel, originalCost, sellPrice];

      //Insert info in fields
      for (let i = 0; i < tds.length; i++) {
        fields[i].value = tds[i].textContent;
      }

      //Remove tr
      e.target.parentElement.parentElement.remove();
    }
  }
}