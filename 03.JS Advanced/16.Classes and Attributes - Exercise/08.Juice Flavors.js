function solve(input) {
    let quantities = {};
    let juices = new Map();

    for (let el of input) {
        let [juice, qty] = el.split(' => ');

        if (!quantities.hasOwnProperty(juice)) {
            quantities[juice] = 0;
        }
        quantities[juice] += Number(qty);

        if (quantities[juice] >= 1000) {
            let bottles = Math.floor(quantities[juice] / 1000);
            let remainer = quantities[juice] % 1000;

            if (juices.has(juice) == false) {
                juices.set(juice, 0);
            }
            juices.set(juice, juices.get(juice) + bottles);
            quantities[juice] = remainer;
        }
    }
    for (el of juices.entries()) {
        console.log(`${el[0]} => ${el[1]}`)
    }
}

solve(['Orange => 2000',
'Peach => 1432',
'Banana => 450',
'Peach => 600',
'Strawberry => 549']
);
solve(['Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789']

);