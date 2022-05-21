function biggerHalf(input) {
    input.sort((a, b) => a - b);
    let start = Math.floor(input.length / 2);
    input = input.slice(start);
    return input;
}
console.log(biggerHalf([3, 19, 14, 7, 2, 19, 6]));