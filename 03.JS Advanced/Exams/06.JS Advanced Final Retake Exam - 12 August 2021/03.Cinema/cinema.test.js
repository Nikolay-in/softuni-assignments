let cinema = require('./cinema');
let { expect } = require('chai');

describe("Tests:", function() {
    describe("test .showMovies()", function() {
        it("with empty array", function() {
            expect(cinema.showMovies([])).to.eq('There are currently no movies to show.');
        });

        it("with valid array", function() {
            expect(cinema.showMovies(['King Kong', 'The Tomorrow War', 'Joker'])).to.eq('King Kong, The Tomorrow War, Joker');
        });

        it("with valid array with one movie", function() {
            expect(cinema.showMovies(['King Kong'])).to.eq('King Kong');
        });
    });

    describe("test .ticketPrice()", function() {
        it("with a valid projection type Premiere", function() {
            expect(cinema.ticketPrice('Premiere')).to.eq(12.00);
        });

        it("with a valid projection type Normal", function() {
            expect(cinema.ticketPrice('Normal')).to.eq(7.50);
        });

        it("with a valid projection type Discount", function() {
            expect(cinema.ticketPrice('Discount')).to.eq(5.50);
        });

        it("with an invalid projection type", function() {
            expect(() => cinema.ticketPrice('')).to.throw('Invalid projection type.');
        });
    });

    describe("test .swapSeatsInHall()", function() {
        it("if one of the seat numbers is missing", function() {
            expect(cinema.swapSeatsInHall(1)).to.eq('Unsuccessful change of seats in the hall.');
        });

        it("if both numbers are equal", function() {
            expect(cinema.swapSeatsInHall(1, 1)).to.eq('Unsuccessful change of seats in the hall.');
        });

        it("if first of the numbers is float", function() {
            expect(cinema.swapSeatsInHall(1.1, 1)).to.eq('Unsuccessful change of seats in the hall.');
        });

        it("if the first number is string", function() {
            expect(cinema.swapSeatsInHall('string', 1)).to.eq('Unsuccessful change of seats in the hall.');
        });

        it("if first is greater than the capacity of the hall", function() {
            expect(cinema.swapSeatsInHall(21, 1)).to.eq('Unsuccessful change of seats in the hall.');
        });

        it("if first seat is equal to 0", function() {
            expect(cinema.swapSeatsInHall(0, 20)).to.eq('Unsuccessful change of seats in the hall.');
        });

        it("if second seat is equal to 0", function() {
            expect(cinema.swapSeatsInHall(20, 0)).to.eq('Unsuccessful change of seats in the hall.');
        });
       
        it("if seats are valid", function() {
            expect(cinema.swapSeatsInHall(1, 2)).to.eq('Successful change of seats in the hall.');
        });

        it("if seats are valid 1 20", function() {
            expect(cinema.swapSeatsInHall(1, 20)).to.eq('Successful change of seats in the hall.');
        });
    });
});
