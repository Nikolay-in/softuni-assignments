function add(num) {
    let sum = num;
    function calc(num2) {
        sum += num2;
        return calc;
    }
    calc.toString = function() { return sum };
    return calc;
}
console.log(add(1)(6)(-3).toString());

//currying

// function add(num) {
//     if (this.sum !== undefined) {
//       this.sum += num
//     } else {
//       this.sum = num
//     }
//     let bindedAdd = add.bind(this)
//     bindedAdd.toString = () => this.sum
//     return bindedAdd;
//   }