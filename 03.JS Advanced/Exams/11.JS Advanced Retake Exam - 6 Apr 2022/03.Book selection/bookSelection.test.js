const bookSelection = require('./bookSelection');
const { expect } = require('chai');

describe("Tests:", () => {
    describe("test .isGenreSuitable()", () => {
        it("unsuitable", () => {
            expect(bookSelection.isGenreSuitable('Thriller', 12)).to.eq('Books with Thriller genre are not suitable for kids at 12 age');
            expect(bookSelection.isGenreSuitable('Horror', 12)).to.eq('Books with Horror genre are not suitable for kids at 12 age');
            expect(bookSelection.isGenreSuitable('Thriller', 11)).to.eq('Books with Thriller genre are not suitable for kids at 11 age');
            expect(bookSelection.isGenreSuitable('Horror', 11)).to.eq('Books with Horror genre are not suitable for kids at 11 age');
        });
        it("suitable", () => {
            expect(bookSelection.isGenreSuitable('Thriller', 13)).to.eq('Those books are suitable');
            expect(bookSelection.isGenreSuitable('Horror', 13)).to.eq('Those books are suitable');
        });
     });

     describe("test .isItAffordable()", () => {
        it("invalid inputs", () => {
            expect(() => bookSelection.isItAffordable()).to.throw('Invalid input');
            expect(() => bookSelection.isItAffordable(1, 'string')).to.throw('Invalid input');
            expect(() => bookSelection.isItAffordable('string', 1)).to.throw('Invalid input');
        });
        
        it("valid inputs", () => {
            expect(bookSelection.isItAffordable(5.5, 6)).to.eq('Book bought. You have 0.5$ left');
            expect(bookSelection.isItAffordable(5.5, 5.5)).to.eq('Book bought. You have 0$ left');
            expect(bookSelection.isItAffordable(5.5, 5)).to.eq('You don\'t have enough money');
        });
     });

     describe("test .suitableTitles()", () => {
        it("invalid inputs", () => {
            expect(() => bookSelection.suitableTitles()).to.throw('Invalid input');
            expect(() => bookSelection.suitableTitles('',[])).to.throw('Invalid input');
            expect(() => bookSelection.suitableTitles('','')).to.throw('Invalid input');
            expect(() => bookSelection.suitableTitles([],[])).to.throw('Invalid input');
        });

        it("valid inputs", () => {
            expect(bookSelection.suitableTitles([{ title: "The Da Vinci Code", genre: "Thriller" }, { title: "The red book", genre: "Psychology" }], 'Thriller')).to.deep.eq(["The Da Vinci Code"])
            expect(bookSelection.suitableTitles([{ title: "The Da Vinci Code", genre: "Thriller" }, { title: "The red book", genre: "Psychology" }], 'Horror')).to.deep.eq([])
        });
     });
});
