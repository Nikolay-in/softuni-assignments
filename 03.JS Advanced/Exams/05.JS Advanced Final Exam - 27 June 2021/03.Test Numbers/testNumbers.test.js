const testNumbers = require('./testNumbers');
const { expect } = require('chai');

describe("Tests:", () => {
    describe("test .sumNumber()", () => {
        it("if first param is not number", () => {
            expect(testNumbers.sumNumbers('a', 1)).to.be.undefined;
        });

        it("if second param is not number", () => {
            expect(testNumbers.sumNumbers(1, 'a')).to.be.undefined;
        });

        it("if both params are not number", () => {
            expect(testNumbers.sumNumbers('a', 'a')).to.be.undefined;
        });

        it("with valid numbers", () => {
            expect(testNumbers.sumNumbers(-2, 3)).to.eq('1.00');
        });
     });

     describe("test .numberChecker()", () => {
        it("input invalid string", () => {
            expect(() => testNumbers.numberChecker('a')).to.throw('The input is not a number!');
        });

        it("input odd number as string", () => {
            expect(testNumbers.numberChecker('1')).to.eq('The number is odd!');
        });

        it("input odd number as number", () => {
            expect(testNumbers.numberChecker(1)).to.eq('The number is odd!');
        });

        it("input even number as string", () => {
            expect(testNumbers.numberChecker('2')).to.eq('The number is even!');
        });

        it("input even number as number", () => {
            expect(testNumbers.numberChecker(2)).to.eq('The number is even!');
        });
    });

    describe("test .averageSumArray()", () => {
        it("input valid array", () => {
            expect(testNumbers.averageSumArray([1, 2, 3])).to.eq(2);
        });
    });
});
