const flowerShop = require('./flowerShop');
const { expect } = require('chai');

describe("Tests:", () => {
    describe("Test .calcPriceOfFlowers()", () => {
        it("test invalid params", () => {
            expect(() => flowerShop.calcPriceOfFlowers(1, 1, 1)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Rose', 'One', 1)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Rose', 1, 'One')).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Rose', 1.1, 1)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Rose', 1, 1.1)).to.throw('Invalid input!');
        });

        it("test valid inputs", () => {
            expect(flowerShop.calcPriceOfFlowers('Rose', 5, 5)).to.eq('You need $25.00 to buy Rose!');
        });
     });

    describe("test .checkFlowersAvailable()", () => {
        it("valid params", () => {
            expect(flowerShop.checkFlowersAvailable('Rose', ["Rose", "Lily", "Orchid"])).to.eq('The Rose are available!');
            expect(flowerShop.checkFlowersAvailable('Tulip', ["Rose", "Lily", "Orchid"])).to.eq('The Tulip are sold! You need to purchase more!');
        });
    });

    describe("test .sellFlowers()", () => {
        it("test invalid params", () => {
            expect(() => flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], -1)).to.throw('Invalid input!');
            expect(() => flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 3)).to.throw('Invalid input!');
            expect(() => flowerShop.sellFlowers('string', 1)).to.throw('Invalid input!');
            expect(() => flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 'string')).to.throw('Invalid input!');
        });

        it("if index is valid = 0", () => {
            expect(flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 0)).to.eq('Lily / Orchid');
            expect(flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 2)).to.eq('Rose / Lily');
        });
    });
});
