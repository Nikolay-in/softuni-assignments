function solve() {
    let [checkBtn, clearBtn] = document.querySelectorAll('button');
    let table = document.querySelector('div#exercise > table');
    let result = document.querySelector('div#check > p');
    checkBtn.addEventListener('click', check);
    clearBtn.addEventListener('click', clear);

    function check() {
        let matrix = [];
        let solved = true;

        let rows = Array.from(document.querySelectorAll('table tbody tr'));
        rows.forEach(row => {
            let cols = Array.from(row.querySelectorAll('input'));
            let rowValues = [];
            cols.forEach(col => rowValues.push(col.value));
            matrix.push(rowValues);
        });

        for (let i = 0; i < matrix.length; i++) {
            let row = new Set();
            let col = new Set();
            for (let j = 0; j < matrix[i].length; j++) {
                row.add(Number(matrix[i][j]));
                col.add(Number(matrix[j][i]));
            }
            if (row.size < 3 || col.size < 3) {
                solved = false;
            }
        }

        if (solved) {
            table.style.border = '2px solid green';
            result.style.color = 'green';
            result.textContent = 'You solve it! Congratulations!';
        } else {
            table.style.border = '2px solid red';
            result.style.color = 'red';
            result.textContent = 'NOP! You are not done yet...';
        }
    }
    
    function clear() {
        let inputs = Array.from(document.querySelectorAll('input[type="number"]'));
        inputs.forEach(e => e.value = '');
        table.style.border = 'none';
        result.textContent = '';
    }
}