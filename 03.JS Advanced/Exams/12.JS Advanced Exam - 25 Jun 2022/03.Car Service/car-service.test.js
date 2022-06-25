const carService = require('./car-service');
const { expect } = require('chai');

describe("Tests:", () => {
    describe("Testing .isItExpensive(issue)", () => {
        it("with Engine or Transmission", () => {
            expect(carService.isItExpensive('Engine')).to.eq('The issue with the car is more severe and it will cost more money');
            expect(carService.isItExpensive('Transmission')).to.eq('The issue with the car is more severe and it will cost more money');
        });

        it("with other string", () => {
            expect(carService.isItExpensive('')).to.eq('The overall price will be a bit cheaper');
        });
     });
     
    describe("Testing .discount(numberOfParts, totalPrice)", () => {
        it('with invalid inputs', () => {
            expect(() => carService.discount('', 1)).to.throw('Invalid input');
            expect(() => carService.discount(1, '')).to.throw('Invalid input');
        });

        it('with <=2 parts', () => {
            expect(carService.discount(2, 100)).to.eq('You cannot apply a discount');
            expect(carService.discount(1, 100)).to.eq('You cannot apply a discount');
        });

        it('with >2 or <=7 parts', () => {
            expect(carService.discount(3, 100)).to.eq('Discount applied! You saved 15$');
            expect(carService.discount(5, 100)).to.eq('Discount applied! You saved 15$');
            expect(carService.discount(7, 100)).to.eq('Discount applied! You saved 15$');
        });

        it('with >7 parts', () => {
            expect(carService.discount(8, 100)).to.eq('Discount applied! You saved 30$');
            expect(carService.discount(9, 100)).to.eq('Discount applied! You saved 30$');
        });
    });
    
    describe("Testing .partsToBuy(partsCatalog, neededParts)", () => {
        it('with invalid inputs', () => {
            expect(() => carService.partsToBuy('', [])).to.throw('Invalid input');
            expect(() => carService.partsToBuy([], '')).to.throw('Invalid input');
        });

        it('with empty catalogue', () => {
            expect(carService.partsToBuy([], [])).to.eq(0);
        });

        it('with valid inputs', () => { 
            expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], ["blowoff valve", "injectors"])).to.eq(145);
            expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], ["blowoff valve", "coil springs"])).to.eq(375);
            expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], ["break pads", "injectors"])).to.eq(0);
        });
    });
});