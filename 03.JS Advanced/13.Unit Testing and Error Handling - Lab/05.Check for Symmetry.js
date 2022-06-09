function isSymmetric(arr) {
    if (!Array.isArray(arr)) {
        return false; // Non-arrays are non-symmetric
    }
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}

const { expect } = require('chai');

describe('Symmetry test', () => {
    it('With symmetric array', () => {
        expect(isSymmetric([1, 2, 2, 1])).to.be.true;
    });
    it('With symmetric array', () => {
        expect(isSymmetric([1, 2, 1])).to.be.true;
    });
    it('With asymmetric array', () => {
        expect(isSymmetric([1, 2, 3])).to.be.false;
    });
    it('With string', () => {
        expect(isSymmetric('string')).to.be.false;
    });
    it('With number', () => {
        expect(isSymmetric(1)).to.be.false;
    });
    it('With object', () => {
        expect(isSymmetric({})).to.be.false;
    });
    it('With type mismatch', () => {
        expect(isSymmetric([1, 2, '1'])).to.be.false;
    });
});