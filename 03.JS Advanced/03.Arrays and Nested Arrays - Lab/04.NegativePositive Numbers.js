function negPosNums(input) {
    let newArr = [];
    for (let el of input) {
        if (el >= 0) {
            newArr.push(el);
        } else {
            newArr.unshift(el);
        }
    }
    for (let el of newArr) {
        console.log(el);
    }
}
negPosNums([3, -2, 0, -1]);