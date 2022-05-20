function validityCheck(x1, y1, x2, y2) {
    const check = (x1, y1, x2, y2) => {
        let result = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        let isValid = (result % 1 == 0) ? 'valid' : 'invalid';
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${isValid}`);
    }
    check(x1, y1, 0, 0);
    check(x2, y2, 0, 0);
    check(x1, y1, x2, y2);
}
validityCheck(2, 1, 1, 1);