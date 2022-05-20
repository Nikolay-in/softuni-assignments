function gcd(a, b) {
    if (b) {
        return gcd(b, a % b);
    } else {
        console.log(a);
    }
}
gcd(2154, 458);