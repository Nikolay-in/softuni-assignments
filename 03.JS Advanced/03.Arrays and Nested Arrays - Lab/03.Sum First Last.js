function sum(params) {
    params = params.map(Number);
    let sum = [...params].shift() + [...params].pop();
    return sum;
}
console.log(sum(['20', '30', '40']));