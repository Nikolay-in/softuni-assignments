function calorie(input) {
    let food = {};
    for (let i = 0; i < input.length; i += 2) {
        food[input[i]] = Number(input[i+1]);
    }
    console.log(food);
}
calorie(['Potato', '93', 'Skyr', '63', 'Cucumber', '18', 'Milk', '42']);