function sort(input) {
    input.sort((a, b) => a.localeCompare(b));
    for (let i = 0; i < input.length; i++) {
        console.log(`${i + 1}.${input[i]}`);
    }
}
sort(["John", "Bob", "Christina", "Ema"]);