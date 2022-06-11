window.addEventListener('load', solve);

function solve() {
    let [model, year, desc, price] = Array.from(document.querySelectorAll('form input, form textarea'));
    let addBtn = document.querySelector('button#add');
    let furnitureList = document.querySelector('tbody#furniture-list');
    let totalPrice = document.querySelector('td.total-price');

    function createTag(tag, text, className = null) {
        let el = document.createElement(tag);
        if (text != '') {
            el.textContent = text;
        }
        if (className) {
            el.className = className;
        }
        return el;
    }

    addBtn.addEventListener('click', onAdd);

    function onAdd(e) {
        e.preventDefault();
        let yearInput = Number(year.value);
        let priceInput = Number(price.value);
        let modelInput = model.value;
        let descInput = desc.value;
        if (!isNaN(yearInput) && yearInput > 0 && !isNaN(priceInput) && priceInput > 0 && modelInput != '' && descInput != '') {
            //Row
            let tr = createTag('tr', '', 'info');
            //Model and price
            tr.appendChild(createTag('td', modelInput));
            tr.appendChild(createTag('td', priceInput.toFixed(2)));
            //Buttons
            let td = document.createElement('td');
            let moreBtn = createTag('button', 'More Info', 'moreBtn');
            moreBtn.addEventListener('click', moreClick);
            let buyBtn = createTag('button', 'Buy it', 'buyBtn');
            buyBtn.addEventListener('click', buyClick);
            td.appendChild(moreBtn);
            td.appendChild(buyBtn);
            tr.appendChild(td);
            furnitureList.appendChild(tr);
            //Row
            tr = createTag('tr', '', 'hide');
            tr.appendChild(createTag('td', 'Year: ' + yearInput));
            td = createTag('td', 'Description: ' + descInput);
            td.colSpan = 3;
            tr.appendChild(td);
            furnitureList.appendChild(tr);
            
            [model, year, desc, price].forEach(el => el.value = '');
        }
    }

    function moreClick(e) {
        let moreInfo = e.target.parentElement.parentElement.nextElementSibling;
        if (e.target.textContent == 'More Info') {
            e.target.textContent = 'Less Info';
            moreInfo.style.display = 'contents';
        } else if (e.target.textContent == 'Less Info') {
            e.target.textContent = 'More Info';
            moreInfo.style.display = 'none';
        }
    }

    function buyClick(e) {
        let singlePrice = Number(e.target.parentElement.previousElementSibling.textContent);
        let total = Number(totalPrice.textContent);
        totalPrice.textContent = (total + singlePrice).toFixed(2);
        e.target.parentElement.parentElement.nextElementSibling.remove();
        e.target.parentElement.parentElement.remove();
    }
}