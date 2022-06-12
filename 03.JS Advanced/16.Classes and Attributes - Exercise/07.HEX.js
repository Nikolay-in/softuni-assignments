class Hex {
    constructor(value) {
        this.value = value,
        this.hex = value
    }
    
    set hex(value) {
        this._hex = '0x' + value.toString(16).toUpperCase();
    }

    toString() {
        return this._hex;
    }

    valueOf() {
        return this.value;
    }

    plus(input) {
        let newObj = {};
        if (typeof input == 'number') {
            newObj = new Hex(this.value + input);
        } else if (typeof input == 'object') {
            newObj = new Hex(this.value + input.value);
        }
        return newObj;
    }

    minus(input) {
        let newObj = {};
        if (typeof input == 'number') {
            newObj = new Hex(this.value - input);
        } else if (typeof input == 'object') {
            newObj = new Hex(this.value - input.value);
        }
        return newObj;
    }

    parse(input) {
        return parseInt(input, 16);
    }
}


let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString()=='0xF');
console.log(FF.parse('AAA'));