class Textbox {
    constructor(selector, regex) {
        this._value;
        this._elements = document.querySelectorAll(selector);
        this._invalidSymbols = regex;
    }

    set value(value) {
        this._value = value;
        let els = Array.from(this._elements);
        els.forEach(el => el.value = value);
    }

    get value() {
      return this._value;
    }

    get elements() {
      return this._elements;
    }

    isValid() {
        let els = Array.from(this._elements);
        for (let el of els) {
            if (el.value.match(this._invalidSymbols)) {
                return false;
            }
        }
        return true;
    }
}

let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
let inputs = document.getElementsByClassName('textbox');
