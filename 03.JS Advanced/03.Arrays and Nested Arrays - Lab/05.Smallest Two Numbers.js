function smallestTwo(input) {
    input.sort((a, b) => a - b);
    input = input.slice(0, 2);
    console.log(input.join(' '));
}
smallestTwo([30, 15, 50, 5]);