function calculator() {
    return {
        init(num1, num2, result) {
            this.num1 = document.querySelector(num1);
            this.num2 = document.querySelector(num2);
            this.result = document.querySelector(result);
        },
        add() {
            this.result.value = Number(this.num1.value) +  Number(this.num2.value);
        },
        subtract () {
            this.result.value = Number(this.num1.value) -  Number(this.num2.value);
        }
    }
}

const calculate = calculator (); 
calculate.init ('#num1', '#num2', '#result'); 



