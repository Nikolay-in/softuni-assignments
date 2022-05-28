function jansNotation(arr) {
    let res = [];
    if (typeof (arr[0]) != 'number' && typeof (arr[1]) != 'number') {
        console.log(`Error: not enough operands!`);
    } else {
        for (let el of arr) {
            if (typeof (el) == 'number') {
                res.push(Number(el));
            } else if (res.length > 1) {
                let num2 = res.pop();
                let num1 = res.pop();
                switch (el) {
                    case '+': res.push(num1 + num2); break;
                    case '-': res.push(num1 - num2); break;
                    case '*': res.push(num1 * num2); break;
                    case '/': res.push(num1 / num2);
                }
            } else {
                console.log(`Error: not enough operands!`);
                return;
            }
        }
        if (res.length > 1) {
            console.log(`Error: too many operands!`);
        } else {
            console.log(res[0]);
        }
    }
}
jansNotation([15,
    '/']
);