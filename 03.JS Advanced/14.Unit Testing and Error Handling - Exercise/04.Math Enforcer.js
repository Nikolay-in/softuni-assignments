const { expect } = require('chai');

let mathEnforcer = {
    addFive: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};


describe('Math tests', () => {
    describe('addFive', () => {
        it('Parameter is not a number', () => {
            expect(mathEnforcer.addFive('string')).to.be.undefined;
        });
        it('Parameter is a valid number', () => {
            expect(mathEnforcer.addFive(5.5)).to.closeTo(10.5, 0.01);
            expect(mathEnforcer.addFive(-6)).to.closeTo(-1, 0.01);
        });
    });
    describe('subtractTen', () => {
        it('Parameter is not a number', () => {
            expect(mathEnforcer.subtractTen('string')).to.be.undefined;
        });
        it('Parameter is a valid number', () => {
            expect(mathEnforcer.subtractTen(10.1)).to.closeTo(0.1, 0.01);
            expect(mathEnforcer.subtractTen(-10)).to.closeTo(-20, 0.01);
        });
    });
    describe('sum', () => {
        it('Any of the params is not a number', () => {
            expect(mathEnforcer.sum('string', 1)).to.be.undefined;
            expect(mathEnforcer.sum(1, 'string')).to.be.undefined;
            expect(mathEnforcer.sum('string', 'string')).to.be.undefined;
        });
        it('Parameters are valid numbers', () => {
            expect(mathEnforcer.sum(10, 20.1)).to.closeTo(30.1, 0.01);
            expect(mathEnforcer.sum(10, -20)).to.equal(-10);
            expect(mathEnforcer.sum(-10, 20)).to.equal(10);
            expect(mathEnforcer.sum(-10, -20)).to.equal(-30);
            expect(mathEnforcer.sum(-10.2, -20.3)).to.closeTo(-30.5, 0.01);
        });
    });
});