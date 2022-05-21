function lastKnums(n, k) {
    let arr = [1];
    while (arr.length < n) {
        let start = (arr.length > k) ? arr.length - k : 0;
        let sum = arr.slice(start, arr.length).reduce((a, b) => a + b);
        arr.push(sum);
    }
    return arr;
}
console.log(lastKnums(6, 3));