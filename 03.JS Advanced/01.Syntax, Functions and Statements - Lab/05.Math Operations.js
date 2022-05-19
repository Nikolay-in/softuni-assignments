function mathOps(num1, num2, op) {
    let result = 0;
    switch(op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num1 / num2; break;
        case '%': result = num1 % num2; break;
        case '**': result = num1 ** num2; break;
        case '+': result = num1 + num2; break;
        case '+': result = num1 + num2;
    }
    console.log(result);
}
mathOps(3, 5.5, '*');