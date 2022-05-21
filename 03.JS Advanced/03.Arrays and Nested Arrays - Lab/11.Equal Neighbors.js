function equalNeighbors(input) {
    let matches = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            let num = input[i][j];
            if (i < input.length - 1 && input[i][j] === input[i + 1][j]) {
                matches++;
            }
            if (j < input[i].length - 1 && input[i][j] === input[i][j + 1]) {
                matches++;
            }
        }
    }
    return matches;
}
console.log(equalNeighbors(
    [['2', '3', '4', '7', '0'],
    ['4', '0', '5', '3', '4'],
    ['2', '3', '5', '4', '2'],
    ['9', '8', '7', '5', '4']]
));

console.log(equalNeighbors(
    [['test', 'yes', 'yo', 'ho'],
 ['well', 'done', 'yo', '6'],
 ['not', 'done', 'yet', '5']]
));