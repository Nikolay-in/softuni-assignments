function cars(input) {
    let cars = new Map;

    for (el of input) {
        let [brand, model, qty] = el.split(' | ');
        if (!cars.has(brand)) {
            cars.set(brand, new Map());
        }
        let currentBrand = cars.get(brand);
        if (!currentBrand.has(model)) {
            currentBrand.set(model, 0);
        }
        let currentQty = currentBrand.get(model);
        currentBrand.set(model, currentQty + Number(qty));
    }

    for ([brand, models] of cars) {
        console.log(brand);
        for ([model, qty] of models) {
            console.log(`###${model} -> ${qty}`);
        }
    }
}

cars(['Audi | Q7 | 1000',
'Audi | Q6 | 100',
'BMW | X5 | 1000',
'BMW | X6 | 100',
'Citroen | C4 | 123',
'Volga | GAZ-24 | 1000000',
'Lada | Niva | 1000000',
'Lada | Jigula | 1000000',
'Citroen | C4 | 22',
'Citroen | C5 | 10']
);