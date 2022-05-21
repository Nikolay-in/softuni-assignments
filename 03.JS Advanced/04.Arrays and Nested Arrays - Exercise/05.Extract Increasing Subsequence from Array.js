function extract(input) {
    let max = input[0];
    input = input.filter((el, i) => {
        if (i == 0) {
            return true;
        } else if (i > 0 && el >= max) {
            max = input[i];
            return true;
        }
    });
    return input;
}
console.log(extract([20, 
    3, 
    2, 
    15,
    6, 
    1]
    ));