function spice(input) {
    let yield = Number(input);
    let days = 0;
    let extracted = 0;
    while (yield >= 100) {
        extracted += yield - 26;
        yield -= 10;
        days++;
    }
    console.log(days);
    console.log(extracted > 25 ? extracted - 26 : extracted);
}
spice(450);