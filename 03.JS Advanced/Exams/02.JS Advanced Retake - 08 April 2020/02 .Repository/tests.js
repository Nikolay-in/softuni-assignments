let { Repository } = require("./solution.js");
let { expect } = require('chai');

describe("Tests:", function () {
    let repo = {};
    beforeEach(() => {
		repo = new Repository({
            name: "string",
            age: "number",
            birthday: "object"
        });
	});

    describe('testing getter count', () => {
		it(`repo.count -> 0`, () => {
			expect(repo.count).to.eq(0)
		})

	});

    describe('testing .add()', () => {
		it('valid obj passed as input: output -> its id in the collection', () => {
			expect(repo.add({ name: '', age: 1, birthday: {} })).to.eq(0);
        });

        it('invalid obj with missing name', () => {
			expect(() => repo.add({ age: 1, birthday: {} })).to.throw('Property name is missing from the entity!');
        });
        it('invalid obj with missing age', () => {
			expect(() => repo.add({ name: '', birthday: {} })).to.throw('Property age is missing from the entity!');
        });
        it('invalid obj with missing birthday', () => {
			expect(() => repo.add({ name: '', age: 1})).to.throw('Property birthday is missing from the entity!');
        });

        it('invalid obj with invalid name', () => {
			expect(() => repo.add({ name: 1, age: 1, birthday: {} })).to.throw('Property name is not of correct type!');
        });

        it('invalid obj with invalid age', () => {
			expect(() => repo.add({ name: '', age: '', birthday: {} })).to.throw('Property age is not of correct type!');
        });

        it('invalid obj with invalid birthday', () => {
			expect(() => repo.add({ name: '', age: 1, birthday: '' })).to.throw('Property birthday is not of correct type!');
        });
	});

    describe('testing .getId()', () => {
		it('invalid id -> throw error', () => {
           expect(() => repo.getId(1)).to.throw('Entity with id: 1 does not exist!')
		});

        it('valid id -> returns object', () => {
            repo.add({ name: '', age: 1, birthday: {} })
            expect(typeof repo.getId(0)).to.eq('object')
         });
	});

    describe('testing .update()', () => {
		it('invalid id -> throw error', () => {
            expect(() => repo.update(0, {},)).to.throw(`Entity with id: 0 does not exist!`);
		});

		it('property name is missing from input object -> throw error', () => {
			repo.add({ name: '', age: 0, birthday: {}, });
			expect(() => repo.update(0, { age: 1, birthday: {} })).to.throw('Property name is missing from the entity!')
		});

        it('property age is missing from input object -> throw error', () => {
			repo.add({ name: '', age: 0, birthday: {}, });
			expect(() => repo.update(0, { name: '', birthday: {} })).to.throw('Property age is missing from the entity!')
		});

        it('property birthday is missing from input object -> throw error', () => {
			repo.add({ name: '', age: 0, birthday: {}, });
			expect(() => repo.update(0, { name: '', age: 1})).to.throw('Property birthday is missing from the entity!')
		});

		it('wrong type of name -> throw TypeError', () => {
			repo.add({ name: '', age: 0, birthday: {}, });
			expect(() => repo.update(0, { name: 0, age: 1, birthday: { date: 0 } })).to.throw(TypeError, 'Property name is not of correct type!')
		});

        it('wrong type of age -> throw TypeError', () => {
			repo.add({ name: '', age: 0, birthday: {}, });
			expect(() => repo.update(0, { name: '', age: '', birthday: { date: 0 } })).to.throw(TypeError, 'Property age is not of correct type!')
		});

        it('wrong type of birthday -> throw TypeError', () => {
			repo.add({ name: '', age: 0, birthday: {}, });
			expect(() => repo.update(0, { name: '', age: 1, birthday: '' })).to.throw(TypeError, 'Property birthday is not of correct type!')
		});
	});

    describe('testing .del()', () => {
		it('delete valid index', () => {
			repo.add({ name: '', age: 1, birthday: {} })
			repo.add({ name: '', age: 1, birthday: {} })
			repo.del(1);
			expect(() => repo.getId(1)).to.throw('Entity with id: 1 does not exist!')
		})
		it('delete with invalid index -> throw error', () => {
			expect(() => repo.del(-1)).to.throw(`Entity with id: -1 does not exist!`)
		})
	})
   
});
