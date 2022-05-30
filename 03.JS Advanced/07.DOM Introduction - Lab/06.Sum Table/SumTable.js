function sumTable() {
    let items = Array.from(document.getElementsByTagName('tr')).slice(1, -1);
    let sum = 0;
    items.forEach(el => sum += Number(el.lastElementChild.textContent));
    document.getElementById('sum').textContent = sum;
}