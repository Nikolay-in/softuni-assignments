const rentCar = require('./rentCar');
const { expect } = require('chai');


describe("Tests:", () => {
    describe("test .searchCar()", () => {
        it("with invalid inputs", () => {
            expect(() => rentCar.searchCar()).to.throw('Invalid input!');
            expect(() => rentCar.searchCar([], 1)).to.throw('Invalid input!');
            expect(() => rentCar.searchCar(1, 'string')).to.throw('Invalid input!');
            expect(() => rentCar.searchCar('string', 1)).to.throw('Invalid input!');
        });
        
        it("with valid inputs", () => {
            expect(() => rentCar.searchCar([], 'Mercedes')).to.throw('There are no such models in the catalog!');
            expect(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], 'Mercedes')).to.throw('There are no such models in the catalog!');
            expect(rentCar.searchCar(["Volkswagen", "BMW", "Audi"], 'BMW')).to.eq('There is 1 car of model BMW in the catalog!');
            expect(rentCar.searchCar(["Volkswagen", "BMW", "BMW", "Audi"], 'BMW')).to.eq('There is 2 car of model BMW in the catalog!');
        });
    });
    
    describe("test .calculatePriceOfCar()", () => {
        it("with invalid inputs", () => {
            expect(() => rentCar.calculatePriceOfCar()).to.throw('Invalid input!');
            expect(() => rentCar.calculatePriceOfCar('string')).to.throw('Invalid input!');
            expect(() => rentCar.calculatePriceOfCar('string', 1.1)).to.throw('Invalid input!');
            expect(() => rentCar.calculatePriceOfCar(1, 'string')).to.throw('Invalid input!');
        });

        it("with valid inputs", () => {
            expect(() => rentCar.calculatePriceOfCar('Mazda', 1)).to.throw('No such model in the catalog!');
            expect(rentCar.calculatePriceOfCar('Toyota', 0)).to.eq('You choose Toyota and it will cost $0!');
            expect(rentCar.calculatePriceOfCar('Toyota', 1)).to.eq('You choose Toyota and it will cost $40!');
            expect(rentCar.calculatePriceOfCar('Toyota', 2)).to.eq('You choose Toyota and it will cost $80!');
        });
    });
    
    describe("test .checkBudget()", () => {
        it("with invalid inputs", () => {
            expect(() => rentCar.checkBudget()).to.throw('Invalid input!');
            expect(() => rentCar.checkBudget('string', 1, 1)).to.throw('Invalid input!');
            expect(() => rentCar.checkBudget(1, 'string', 1)).to.throw('Invalid input!');
            expect(() => rentCar.checkBudget(1, 1, 'string')).to.throw('Invalid input!');
        });

        it("with valid inputs", () => {
            expect(rentCar.checkBudget(1, 1, 1)).to.eq('You rent a car!');
            expect(rentCar.checkBudget(1, 1, 0)).to.eq('You need a bigger budget!');
        });
    });
});