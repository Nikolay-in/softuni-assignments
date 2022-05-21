function magicMatrices(input) {
    let result = true;
    let sum;
    for (let i = 0; i < input.length; i++) {
        let rowSum = 0;
        for (let j = 0; j < input.length; j++) {
            rowSum += input[i][j];
        }
        if (!sum) {
            sum = rowSum;
        } else if (sum != rowSum) {
            result = false;
            break;
        }
        let colSum = 0;
        for (let j = 0; j < input.length; j++) {
            colSum += input[j][i];
        }
        if (sum != colSum) {
            result = false;
            break;
        }
    }
    console.log(result);
}
magicMatrices(
    [[4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]]
);