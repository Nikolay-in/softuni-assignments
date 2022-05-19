function sumNumbers(a, b) {
    let num1 = Number(a);
    let num2 = Number(b);
    result = 0;
    for (let i = num1; i <= num2; i++) {
        result += i;
    }
    console.log(result);
}
sumNumbers('-8', '20');