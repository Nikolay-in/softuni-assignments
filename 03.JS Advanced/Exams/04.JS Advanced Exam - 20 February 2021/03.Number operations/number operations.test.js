const numberOperations = require('./number operations');
const { expect } = require('chai');

describe("Tests:", () => {
    describe("test .powNumber()", () => {
        it("valid return", () => {
            expect(numberOperations.powNumber(2)).to.eq(4);
        });
    });

    describe("test .numberChecker()", () => {
        it("passing a non-number -> throws error", () => {
            expect(() => numberOperations.numberChecker('string')).to.throw('The input is not a number!');
        });

        it("passing a string number 2 -> valid return", () => {
            expect(numberOperations.numberChecker('2')).to.eq('The number is lower than 100!');
        });

        it("passing a number 2 -> valid return", () => {
            expect(numberOperations.numberChecker(2)).to.eq('The number is lower than 100!');
        });

        it("passing a number 100 -> valid return", () => {
            expect(numberOperations.numberChecker(100)).to.eq('The number is greater or equal to 100!');
        });
    });

    describe("test .sumArrays()", () => {
        it('input two equal length arrays', () => {
            expect(numberOperations.sumArrays([1, 2, 3], [3, 2, 1])).to.deep.eq([4, 4, 4]);
        });

        it('input first array shorter than second arrays', () => {
            expect(numberOperations.sumArrays([1, 2, 3, 4], [3, 2, 1])).to.deep.eq([4, 4, 4, 4]);
        });

        it('input second array shorter than first arrays', () => {
            expect(numberOperations.sumArrays([1, 2, 3], [3, 2, 1, 4])).to.deep.eq([4, 4, 4, 4]);
        });

    });
});


console.log(numberOperations);