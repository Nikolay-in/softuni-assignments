function solution(input) {
    let num = input;
    return (n) => {
        return num + n;
    }
}

let add5 = solution(5);
console.log(add5(2));
console.log(add5(3));
