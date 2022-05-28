function carFactory(input) {
    let engines = {
        small: { power: 90, volume: 1800 },
        normal: { power: 120, volume: 2400 },
        monster: { power: 200, volume: 3500 },
    }
    let typeOfEngine = 'small';
    if (input.power > 90 && input.power <= 120) {
        typeOfEngine = 'normal';
    } else if (input.power > 120) {
        typeOfEngine = 'monster';
    }
    let wheelSize = (input.wheelsize % 2) ? input.wheelsize : input.wheelsize - 1;
    let wheelsArr = Array(4);
    return {
        model: input.model,
        engine: engines[typeOfEngine],
        carriage: {
            type: input.carriage,
            color: input.color
        },
        wheels: wheelsArr.fill(wheelSize, 0, 4)
    }
}

console.log(carFactory({ model: 'VW Golf II',
power: 90,
color: 'blue',
carriage: 'hatchback',
wheelsize: 14 }
));