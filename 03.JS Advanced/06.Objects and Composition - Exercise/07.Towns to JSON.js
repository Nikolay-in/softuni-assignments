function townsToJson(input) {
    let towns = [];
    for (let i = 1; i < input.length; i++) {
        let townInfo = input[i].split('|').filter(e => e).map(e => e.trim());
        let lat = Number(Number(townInfo[1]).toFixed(2));
        let lon = Number(Number(townInfo[2]).toFixed(2));
        let town = {
            Town: townInfo[0],
            Latitude: lat,
            Longitude: lon,
        }
        towns.push(town);
    }
    console.log(JSON.stringify(towns));
}
townsToJson(['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |']
);