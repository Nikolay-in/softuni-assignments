function sort(input) {
    input.sort((a, b) => a - b);
    let sorted = [];
    let first = true;
    while (input.length) {
        if (first) {
            sorted.push(input.shift());
            first = false;
        } else {
            sorted.push(input.pop());
            first = true;
        }
    }
    return sorted;
}
console.log(sort([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]));