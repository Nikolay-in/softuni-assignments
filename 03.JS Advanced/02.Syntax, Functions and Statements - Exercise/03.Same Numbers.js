function sameNums(input) {
    input += '';
    let same = true;
    let sum = Number(input[0]);
    for (i = 1; i < input.length; i++) {
        sum += Number(input[i]);
        if (input[i-1] != input[i]) {
            same = false;
        }
    }
    console.log(same);
    console.log(sum);
}
sameNums(2);