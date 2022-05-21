function rotate(arr, counts) {
    for (let i = 0; i < counts; i++) {
        let el = arr.pop();
        arr.unshift(el);
    }
    console.log(arr.join(' '));
}
rotate(['1', '2', '3', '4'], 2);