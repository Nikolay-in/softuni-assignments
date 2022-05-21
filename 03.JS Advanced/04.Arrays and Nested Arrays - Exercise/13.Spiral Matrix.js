function spiralMatrix(n, m) {
    // create empty n x n array
    let result = new Array(n).fill().map(() => new Array(m).fill());
    let counter = 1;
    let startCol = 0;
    let endCol = m - 1;
    let startRow = 0;
    let endRow = n - 1;
    while (startCol <= endCol && startRow <= endRow) {
        for (let i = startCol; i <= endCol; i++) {
            result[startRow][i] = counter++;
        }
        startRow++;
        for (let i = startRow; i <= endRow; i++) {
            result[i][endCol] = counter++;
        }
        endCol--;
        for (let i = endCol; i >= startCol; i--) {
            result[endRow][i] = counter++;
        }
        endRow--;
        for (let i = endRow; i >= startRow; i--) {
            result[i][startCol] = counter++;
        }
        startCol++;
    }
    for (let el of result) {
        console.log(el.join(' '));
    }
}
spiralMatrix(5, 5);