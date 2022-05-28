function store(input) {
    let store = {};
    for (line of input) {
        let [product, price] = line.split(' : ');
        price = Number(price);
        let letter = product[0].toUpperCase();
        if (!store.hasOwnProperty(letter)) {
            store[letter] = {};
        }
        store[letter][product] = price;
    }
    let letters = Object.keys(store).sort((a, b) => a.localeCompare(b));
    for (let letter of letters) {
        console.log(letter);
        let products = Object.keys(store[letter]).sort((a, b) => a.localeCompare(b));
        for (let product of products) {
            console.log(` ${product}: ${store[letter][product]}`);
        }
    }
}
store(['Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10']
);