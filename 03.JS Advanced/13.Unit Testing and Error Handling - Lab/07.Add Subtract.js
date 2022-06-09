const { expect } = require('chai');

function createCalculator() {
    let value = 0;
    return {
        add: function (num) { value += Number(num); },
        subtract: function (num) { value -= Number(num); },
        get: function () { return value; }
    }
}

describe('Calculator', () => {
    it('Get 0 without doing any operation', () => {
        expect(createCalculator().get()).to.equal(0);
    });

    it('Add valid number', () => {
        const result = createCalculator();
        result.add(1);
        expect(result.get()).to.equal(1);
        result.add(1.1);
        expect(result.get()).to.equal(2.1);
    });

    it('Subtract valid number', () => {
        const result = createCalculator();
        result.subtract(1);
        expect(result.get()).to.equal(-1);
        result.subtract(1.1);
        expect(result.get()).to.equal(-2.1);
    });

    it('Add and subtract valid number', () => {
        const result = createCalculator();
        result.add(1);
        result.subtract(1);
        expect(result.get()).to.equal(0);
        result.add(1.1);
        result.subtract(1.1);
        expect(result.get()).to.equal(0);
    });

    it('Use invalid input', () => {
        const result = createCalculator();
        result.add('string');
        expect(result.get()).to.be.NaN;
        result.add([1, 2, 3]);
        expect(result.get()).to.be.NaN;
        result.add({});
        expect(result.get()).to.be.NaN;
    });
});