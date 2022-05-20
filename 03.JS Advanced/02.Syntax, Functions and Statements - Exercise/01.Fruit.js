function fruits(fruit, grams, price) {
    let kg = grams / 1000;
    let money = (price * kg).toFixed(2);
    console.log(`I need $${money} to buy ${kg.toFixed(2)} kilograms ${fruit}.`)
}
fruits('orange', 2500, 1.80);