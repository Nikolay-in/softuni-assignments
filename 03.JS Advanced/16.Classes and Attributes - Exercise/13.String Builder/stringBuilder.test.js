const StringBuilder = require('./stringBuilder');
const { expect } = require('chai');

describe("Tests:", () => {
    describe("Invalid instantiation with a non-string -> throw", () => {
        it("throw", () => {
            expect(() => new StringBuilder(1)).to.throw('Argument must be a string');
        });
    });

    describe("Valid instantiation", () => {
        
        it("with no parameter", () => {
            let str = new StringBuilder();
            expect(str.toString()).to.eq('');
        });

        it("with 1 letter as param", () => {
            let str = new StringBuilder('a');
            expect(str.toString()).to.eq('a');
        });
    });
    
    describe("Test functionality", () => {
        
        describe('test append', () => {
            beforeEach(() => {
                str = new StringBuilder('hello');
            });

            it('with empty string', () => {
                str.append('');
                expect(str.toString()).to.eq('hello');
            });

            it('with interval', () => {
                str.append(' ');
                expect(str.toString()).to.eq('hello ');
            });

            it('with 1 letter', () => {
                str.append('a');
                expect(str.toString()).to.eq('helloa');
            });

            it('with 3 letters', () => {
                str.append('abc');
                expect(str.toString()).to.eq('helloabc');
            });

            it('with 1 number', () => {
                str.append('1');
                expect(str.toString()).to.eq('hello1');
            });

            it('with 3 numbers', () => {
                str.append('123');
                expect(str.toString()).to.eq('hello123');
            });
            
            it('with invalid input', () => {
                let str = new StringBuilder('hello');
                expect(() => str.append(undefined)).to.throw('Argument must be a string');
                expect(() => str.append(1)).to.throw('Argument must be a string');
                expect(() => str.append()).to.throw('Argument must be a string');
            });
        });

        describe('test prepend', () => {
            beforeEach(() => {
                str = new StringBuilder('hello');
            });

            it('with empty string', () => {
                str.prepend('');
                expect(str.toString()).to.eq('hello');
            });

            it('with interval', () => {
                str.prepend(' ');
                expect(str.toString()).to.eq(' hello');
            });

            it('with 1 letter', () => {
                str.prepend('a');
                expect(str.toString()).to.eq('ahello');
            });

            it('with 3 letters', () => {
                str.prepend('abc');
                expect(str.toString()).to.eq('abchello');
            });

            it('with 1 number', () => {
                str.prepend('1');
                expect(str.toString()).to.eq('1hello');
            });

            it('with 3 numbers', () => {
                str.prepend('123');
                expect(str.toString()).to.eq('123hello');
            });
            
            it('with invalid input', () => {
                let str = new StringBuilder('hello');
                expect(() => str.prepend(undefined)).to.throw('Argument must be a string');
                expect(() => str.prepend(1)).to.throw('Argument must be a string');
                expect(() => str.prepend()).to.throw('Argument must be a string');
            });
        });

        describe('test insertAt', () => {
            beforeEach(() => {
                str = new StringBuilder('hello');
            });

            it('at start', () => {
                str.insertAt('ab', 0);
                expect(str.toString()).to.eq('abhello'); 
            });
            
            it('at middle', () => {
                str.insertAt('ab', 3);
                expect(str.toString()).to.eq('helablo');
            });

            it('interval at middle', () => {
                str.insertAt(' ', 3);
                expect(str.toString()).to.eq('hel lo');
            });
            
            it('at end', () => {
                str.insertAt('ab', 5);
                expect(str.toString()).to.eq('helloab');
            });
            
            it('insert empty string', () => {
                str.insertAt('', 5);
                expect(str.toString()).to.eq('hello');
            });
            
            it('invalid insert', () => {
                expect(() => str.insertAt(undefined, 0)).to.throw('Argument must be a string');
                expect(() => str.insertAt(1, 0)).to.throw('Argument must be a string');
                expect(() => str.insertAt(undefined)).to.throw('Argument must be a string');
                expect(() => str.insertAt()).to.throw('Argument must be a string');
            });
        });

        describe('test remove', () => {
            beforeEach(() => {
                str = new StringBuilder('hello');
            });
            
            it('delete from start', () => {
                str.remove(0, 1);
                expect(str.toString()).to.eq('ello');
            });

            it('delete from inside to end', () => {
                str.remove(2, 3);
                expect(str.toString()).to.eq('he');
            });

            it('delete middle', () => {
                str.remove(1, 3);
                expect(str.toString()).to.eq('ho');
            });

            it('delete middle (longer length', () => {
                str.remove(1, 10);
                expect(str.toString()).to.eq('h');
            });

            it('delete last letter', () => {
                str.remove(4, 1);
                expect(str.toString()).to.eq('hell');
            });

            it('delete whole string', () => {
                str.remove(0, 5);
                expect(str.toString()).to.eq('');
            });

            it('delete whole string (longer length)', () => {
                str.remove(0, 10);
                expect(str.toString()).to.eq('');
            });

            it('delete nothing from start', () => {
                str.remove(0, 0);
                expect(str.toString()).to.eq('hello');
            });


            it('delete nothing from inside', () => {
                str.remove(2, 0);
                expect(str.toString()).to.eq('hello');
            });

            it('delete nothing from end', () => {
                str.remove(5, 0);
                expect(str.toString()).to.eq('hello');
            });

            it('delete nothing from end (invalid length)', () => {
                str.remove(5, 1);
                expect(str.toString()).to.eq('hello');
            });
        });

        it('toString works correctly ', () => {
            const expected = 'abc123   ';
            const str = new StringBuilder();
            expected.split('').forEach(s => {str.append(s); str.prepend(s); });
            str.insertAt('test', 3);
            str.remove(2, 4);
            expect(str.toString()).to.equal('  t321cbaabc123   ');
        });
    });
});