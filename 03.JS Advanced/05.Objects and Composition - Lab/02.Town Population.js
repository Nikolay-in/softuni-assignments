function townPopulation(input) {
    let cities = {};
    for (el of input) {
        let [city, population] = el.split(' <-> ');
        if (!cities.hasOwnProperty(city)) {
            cities[city] = Number(population);
        } else {
            cities[city] += Number(population);
        }
    }
    for ([city, population] of Object.entries(cities)) {
        console.log(`${city} : ${population}`);
    }
}
townPopulation(['Istanbul <-> 100000',
'Honk Kong <-> 2100004',
'Jerusalem <-> 2352344',
'Mexico City <-> 23401925',
'Istanbul <-> 1000']
);