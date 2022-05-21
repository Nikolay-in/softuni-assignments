function processOdd(input) {
    let odd = [];
    for (let i = 0; i < input.length; i++) {
        if (i % 2 == 1) {
            odd.push(input[i]);
        }
    }
    odd = odd.map( el => el * 2).reverse();
    return odd.join(' ');
}
console.log(processOdd([3, 0, 10, 4, 7, 3]));