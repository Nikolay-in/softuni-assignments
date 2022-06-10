let { dealership } = require('./dealership.js');
let { expect } = require('chai');

describe("Tests:", function() {
    describe("test .newCarCost()", function() {
        it("returning old car", function() {
            expect(dealership.newCarCost('Audi A4 B8', 30000)).to.eq(15000);
        });

        it("not returning old car", function() {
            expect(dealership.newCarCost('BMW E39', 10000)).to.eq(10000);
        });
     });

     describe("test .carEquipment()", function() {
        it("valid equipment", function() {
            expect(dealership.carEquipment(['heated seats', 'sliding roof', 'sport rims', 'navigation'], [1, 3])).to.deep.eq(['sliding roof', 'navigation']);
        });

        it("with no equipment", function() {
            expect(dealership.carEquipment(['heated seats', 'sliding roof', 'sport rims', 'navigation'], [])).to.deep.eq([]);
        });
     });

     describe("test .euroCategory()", function() {
        it("euro 4", function() {
            expect(dealership.euroCategory(4)).to.eq('We have added 5% discount to the final price: 14250.');
        });

        it("euro 3", function() {
            expect(dealership.euroCategory(3)).to.eq('Your euro category is low, so there is no discount from the final price!');
        });
     });
});