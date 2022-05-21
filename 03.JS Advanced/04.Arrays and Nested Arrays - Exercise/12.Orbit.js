function orbit(input) {
    let w = input[0];
    let h = input[1];
    let x = input[2];
    let y = input[3];
    // create empty n x n array
    let result = new Array(w).fill().map(() => new Array(h).fill()); 
    result[x][y] = 1;
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            let nX = Math.abs(x - i);
            let nY = Math.abs(y - j);
            let num = Math.max(nX, nY);
            result[i][j] = num + 1;
        }
    }
    result.map(x => console.log(x.join(' ')));
}
orbit([5, 5, 4, 4]);