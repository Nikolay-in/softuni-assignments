function cookingByNums(num, ...commands) {
    num = Number(num);
    for (el of commands) {
        switch (el) {
            case 'chop': num /= 2; break;
            case 'dice': num = Math.sqrt(num); break;
            case 'spice': num++; break;
            case 'bake': num *= 3; break;
            case 'fillet': num *= 0.8;
        }
        console.log(num);
    }
}
cookingByNums('9', 'dice', 'spice', 'chop', 'bake', 'fillet');