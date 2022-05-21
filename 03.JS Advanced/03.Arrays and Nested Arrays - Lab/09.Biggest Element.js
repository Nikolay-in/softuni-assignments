function biggestElement(input) {
    let biggest = input[0][0];
    for (let i = 0; i < input.length; i ++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] > biggest) {
                biggest = input[i][j];
            }
        }
    }
    return biggest;
}
console.log(biggestElement([[3, 5, 7, 12],
    [-1, 4, 33, 2],
    [8, 3, 0, 4]]
   ));