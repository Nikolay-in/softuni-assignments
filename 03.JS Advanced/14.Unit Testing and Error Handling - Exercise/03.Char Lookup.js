const { expect } = require('chai');

function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

describe('Tests:', () => {
    it('One of the params is invalid', () => {
        expect(lookupChar(1, 1)).to.be.undefined;
        expect(lookupChar('test', 'string')).to.be.undefined;
        expect(lookupChar('test', 1.1)).to.be.undefined;
    });

    it('Index is out of boundaries', () => {
        expect(lookupChar('test', -1)).to.be.equal('Incorrect index');
        expect(lookupChar('test', 4)).to.be.equal('Incorrect index');
        expect(lookupChar('test', 5)).to.be.equal('Incorrect index');
    });

    it('Correct result', () => {
        expect(lookupChar('test', 0)).to.be.equal('t');
        expect(lookupChar('test', 3)).to.be.equal('t');
        expect(lookupChar('test', 2)).to.be.equal('s');
    });
});