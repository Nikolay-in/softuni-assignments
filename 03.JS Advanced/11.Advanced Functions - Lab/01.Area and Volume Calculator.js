function area() {
    return Math.abs(this.x * this.y);
};

function vol() {
    return Math.abs(this.x * this.y * this.z);
};

function solve(area, vol, input) {
    let result = [];
    input = JSON.parse(input);
    for (let line of input) {
        let currentReslt = {
            area: area.call(line),  
            volume: vol.call(line)  
        };
        result.push(currentReslt);
    }
    return result;
}

console.log(solve(area, vol, `[
    {"x":"1","y":"2","z":"10"},
    {"x":"7","y":"7","z":"10"},
    {"x":"5","y":"2","z":"10"}
    ]`));
    