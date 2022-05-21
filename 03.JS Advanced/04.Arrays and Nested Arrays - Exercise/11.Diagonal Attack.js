function diagonalAttack(input) {
    input = input.map(x => x.split(' '));
    let diag1start = 0;
    let diag2start = input[0].length - 1;
    let diag1 = 0;
    let diag2 = 0;
    for (let i = 0; i < input.length; i++) {
        diag1 += Number(input[i][diag1start]);
        diag2 += Number(input[i][diag2start]);
        diag1start++;
        diag2start--;
    }
    if (diag1 == diag2) {
        diag1start = 0;
        diag2start = input[0].length - 1;
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                if (j != diag1start && j != diag2start) {
                    input[i][j] = diag1;
                }
            }
            diag1start++;
            diag2start--;
        }
    }
    input.map(x => console.log(x.join(' ')));
}

diagonalAttack(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']
);