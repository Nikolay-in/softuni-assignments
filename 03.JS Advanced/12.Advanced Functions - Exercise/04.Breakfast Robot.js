function solution() {
    let recipes = {
        apple: {
            carbohydrate: 1,
            flavour: 2
        },
        lemonade: {
            carbohydrate: 10,
            flavour: 20
        },
        burger: {
            carbohydrate: 5,
            fat: 7,
            flavour: 3
        },
        eggs: {
            protein: 5,
            fat: 1,
            flavour: 1
        },
        turkey: {
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10
        }
    }
    let stock = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    }
    let commands = {
        restock(el, qty) {
            stock[el] += Number(qty);
            return 'Success';
        },
        prepare(el, qty) {
            qty = Number(qty);
            let neededIngredients = Object.entries(recipes[el]);
            for (let [ingredient, qtyPerOne] of neededIngredients) {
                if (qtyPerOne * qty > stock[ingredient]) {
                    return `Error: not enough ${ingredient} in stock`;
                }
            }
            for (let [ingredient, qtyPerOne] of neededIngredients) {
                stock[ingredient] -= qtyPerOne * qty;
            }
            return 'Success';
        },
        report() {
            return Object.entries(stock).map(el => el[0] + '=' + Number(el[1])).join(' ');
        }
    }

    return (input) => {
        let tokens = input.split(' ');
        return commands[tokens.shift()](...tokens);
    }
}

let manager = solution (); 
console.log (manager ("restock flavour 50")); // Success 
console.log (manager ("prepare lemonade 4")); // Error: not enough carbohydrate in stock 
console.log (manager ("report")); // Error: not enough carbohydrate in stock 
