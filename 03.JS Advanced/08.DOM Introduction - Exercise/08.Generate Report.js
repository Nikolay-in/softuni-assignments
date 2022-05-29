function generateReport() {
    let checkBoxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
    let checkBoxesState = [];
    for (let i = 0; i < checkBoxes.length; i++) {
        let name = checkBoxes[i].name;
        let checked = checkBoxes[i].checked;
        let checkBox = { name, checked};
        checkBoxesState.push(checkBox);
    }
    let output = [];
    let rows = Array.from(document.querySelectorAll('tbody tr'));
    for (let row of rows) {
        let cells = Array.from(row.children);
        let entry = {};
        for (let i = 0; i < cells.length; i++) {
            if (checkBoxesState[i].checked) {
                entry[checkBoxesState[i].name] = cells[i].textContent;
            }
        }
        output.push(entry);
    }
    document.getElementById('output').value = JSON.stringify(output);
}