let ChristmasMovies = require('./02.Christmas Movies');
const { expect } = require('chai');

describe("Tests:", () => {
    let christmas;
    beforeEach(() => {
		christmas = new ChristmasMovies();
	});

    describe("Instantiation", function() {
        it("If props exist", function() {
            expect(christmas.movieCollection).to.eql([]);
			expect(christmas.movieCollection.length).to.equal(0);
			expect(christmas.watched).to.eql({});
			expect(Object.keys(christmas.watched).length).to.equal(0);
			expect(christmas.actors).to.eql([]);
			expect(christmas.actors.length).to.equal(0);
        });
    });

    describe('buyMovie', () => {
        it('New movie', () => {
            expect(christmas.buyMovie('Last Christmas', ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby'])).to.be.equal('You just got Last Christmas to your collection in which Madison Ingoldsby, Emma Thompson, Boris Isakovic are taking part!');
        });

        it('Movie already in stock', () => {
            christmas.buyMovie('Last Christmas', ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby']);
            expect(() => christmas.buyMovie('Last Christmas', ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby'])).to.throw('You already own Last Christmas in your collection!');        
        });
    });

    describe('discardMovie', () => {
        it('If movie is not in the collection', () => {
            expect(() => { christmas.discardMovie('The Grinch') }).to.throw('The Grinch is not at your collection!');
        });

        it('If movie is in the collection and not watched', () => {
            christmas.buyMovie('Last Christmas', ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby']);
            expect(() => christmas.discardMovie('Last Christmas')).to.throw('Last Christmas is not watched!');
        });
        
        it('If movie is in the collection and watched', () => {
            christmas.buyMovie('Last Christmas', ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby']);
            christmas.watchMovie('Last Christmas');
            expect(christmas.discardMovie('Last Christmas')).to.equal('You just threw away Last Christmas!');
        });
    });

    describe('watchMovie', () => {
        it('If movie is not in the collection', () => {
            expect(() => { christmas.watchMovie('Home Alone') }).to.throw('No such movie in your collection!');
        });

        it('If movie is in the collection', () => {
            christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern'])
            christmas.watchMovie('Home Alone');
            expect(christmas.watched['Home Alone']).to.equal(1);
        });
        
        it('If movie is in the collection and watched 2nd time', () => {
            christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern'])
            christmas.watchMovie('Home Alone');
            christmas.watchMovie('Home Alone');
            christmas.watchMovie('Home Alone');
            expect(christmas.watched['Home Alone']).to.equal(3);
        });
    });

    describe('favouriteMovie', () => {
        it('If the collection is empty', () => {
            expect(() => { christmas.favouriteMovie() }).to.throw('You have not watched a movie yet this year!');
        });

        it('Correct fav movie', () => {
            christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern'])
            christmas.buyMovie('Last Christmas', ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby'])
            christmas.watchMovie('Last Christmas');
            christmas.watchMovie('Last Christmas');
            christmas.watchMovie('Home Alone');
            christmas.watchMovie('Home Alone');
            christmas.watchMovie('Home Alone');
            expect(christmas.favouriteMovie()).to.equal('Your favourite movie is Home Alone and you have watched it 3 times!');
        });
    });

    describe('mostStarredActor', () => {
        it('If the collection is empty', () => {
            expect(() => { christmas.mostStarredActor() }).to.throw('You have not watched a movie yet this year!');
        });

        it('Correct most starred', () => {
            christmas.buyMovie('Home Alone', ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern']);
            christmas.buyMovie('Home Alone 2', ['Macaulay Culkin']);
            christmas.buyMovie('The Grinch', ['Benedict Cumberbatch', 'Rashida Jones']);
            christmas.buyMovie('Last Christmas', ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby'])
            expect(christmas.mostStarredActor()).to.equal('The most starred actor is Macaulay Culkin and starred in 2 movies!');
        });
    });
});
