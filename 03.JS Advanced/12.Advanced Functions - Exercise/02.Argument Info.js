function argumentInfo(...args) {
    let counter = {};
    for (let arg of args) {
        let type = typeof arg;
        if (!counter.hasOwnProperty(type)) {
            counter[type] = 1;
        } else {
            counter[type]++;
        }
        console.log(`${type}: ${arg}`);
    }
    counter = Object.entries(counter).sort((a, b) => b[1] - a[1]);
    counter.forEach(el => console.log(`${el[0]} = ${el[1]}`));
}
argumentInfo('cat', 42, function () { console.log('Hello world!'); });