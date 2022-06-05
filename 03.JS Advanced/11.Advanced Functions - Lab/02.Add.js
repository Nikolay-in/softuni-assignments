function solution(input) {
    let num = input;
    function newFunc(n) {
        return num + n;
    }
    return newFunc;
}

let add5 = solution(5);
console.log(add5(2));
console.log(add5(3));
