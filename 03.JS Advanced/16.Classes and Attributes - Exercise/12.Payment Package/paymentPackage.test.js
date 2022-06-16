const PaymentPackage = require('./paymentPackage');
const { expect } = require('chai');

describe("Tests:", function() {
    describe('Invalid instantiations', () => {
        it("with 0 params -> throw", () => {
            expect(() => pp = new PaymentPackage()).to.throw();
        });

        it("with 1 param -> throw", () => {
            expect(() => pp = new PaymentPackage()).to.throw();
            expect(() => pp = new PaymentPackage('HR Services')).to.throw();
        });

        it("with invalid name -> throw", () => {
            expect(() => pp = new PaymentPackage('', 0)).to.throw('Name must be a non-empty string');
            expect(() => pp = new PaymentPackage(0, 0)).to.throw('Name must be a non-empty string');
        });

        it("with invalid price -> throw", () => {
            expect(() => pp = new PaymentPackage('Name', 'String')).to.throw('Value must be a non-negative number');
            expect(() => pp = new PaymentPackage('Name', -1)).to.throw('Value must be a non-negative number');
        });
    });

    describe('Valid instantiations', () => {

        beforeEach(() => {
            pp = new PaymentPackage('HR Services', 1500);
        });

        it('check VAT', () => {
            expect(pp.VAT).to.eq(20);
        });

        it('set invalid VAT', () => {
            expect(() => pp.VAT = 'string').to.throw('VAT must be a non-negative number');
            expect(() => pp.VAT = -1).to.throw('VAT must be a non-negative number');
        });

        it('check active', () => {
            expect(pp.active).to.be.true;
        });

        it('set invalid active type', () => {
            expect(() => pp.active = null).to.throw('Active status must be a boolean');
        });

        it('change all to valid values', () => {
            pp.name = 'Consultation';
            pp.value = 0;
            pp.VAT = 0;
            pp.active = false;
            expect(pp.name).to.eq('Consultation');
            expect(pp.value).to.eq(0);
            expect(pp.VAT).to.eq(0);
            expect(pp.active).to.eq(false);
            expect(pp.toString()).to.eq('Package: Consultation (inactive)\n- Value (excl. VAT): 0\n- Value (VAT 0%): 0');
        });

        it('change all to valid values second', () => {
            pp.name = 'Consultation';
            pp.value = 800;
            pp.VAT = 20;
            pp.active = true;
            expect(pp.name).to.eq('Consultation');
            expect(pp.value).to.eq(800);
            expect(pp.VAT).to.eq(20);
            expect(pp.active).to.eq(true);
            expect(pp.toString()).to.eq('Package: Consultation\n- Value (excl. VAT): 800\n- Value (VAT 20%): 960');
        });

        it('change all to valid values third', () => {
            pp.name = 'Consultation';
            pp.value = 10.5;
            pp.VAT = 20;
            pp.active = true;
            expect(pp.name).to.eq('Consultation');
            expect(pp.value).to.eq(10.5);
            expect(pp.VAT).to.eq(20);
            expect(pp.active).to.eq(true);
            expect(pp.toString()).to.eq('Package: Consultation\n- Value (excl. VAT): 10.5\n- Value (VAT 20%): 12.6');
        });

        it('change all to valid values fourth', () => {
            pp.name = 'Consultation';
            pp.value = 10;
            pp.VAT = 20.5;
            pp.active = true;
            expect(pp.name).to.eq('Consultation');
            expect(pp.value).to.eq(10);
            expect(pp.VAT).to.eq(20.5);
            expect(pp.active).to.eq(true);
            expect(pp.toString()).to.eq('Package: Consultation\n- Value (excl. VAT): 10\n- Value (VAT 20.5%): 12.05');
        });

        it('change name to invalid', () => {
            expect(() => pp.name = '').to.throw('Name must be a non-empty string');
            expect(() => pp.name = 1).to.throw('Name must be a non-empty string');
        });

        it('change value to invalid', () => {
            expect(() => pp.value = '').to.throw('Value must be a non-negative number');
            expect(() => pp.value = -1).to.throw('Value must be a non-negative number');
        });
	});
});