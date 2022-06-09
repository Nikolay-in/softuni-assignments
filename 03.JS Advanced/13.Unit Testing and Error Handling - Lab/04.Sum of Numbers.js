function sum(arr) {
    let sum = 0;
    for (let num of arr) {
        sum += Number(num);
    }
    return sum;
}

describe('Test sum', () => {
    it('First test', () => {
        let arr = [1, 2, 3];
        if (sum(arr) !== 6) { throw new Error('Wrong result'); }
    });
    it('Second test', () => {
        let arr = [1, 0];
        if (sum(arr) !== 1) { throw new Error('Wrong result'); }
    });
    it('Third test', () => {
        let arr = [0, 0, 0];
        if (sum(arr) !== 0) { throw new Error('Wrong result'); }
    });
});