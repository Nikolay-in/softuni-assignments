class List {
    constructor() {
        this.numbers = []
        this.size = 0;
    }

    add(num) {
        if (typeof num == 'number') {
            this.numbers.push(num);
            this.numbers.sort((a, b) => a - b);
            this.size++;
        }
        return this;
    }

    remove(i) {
        if (i >= 0 && i < this.numbers.length && this.numbers.length > 0) {
            this.numbers.splice(i, 1);
            this.size = this.numbers.length;
        }
        return this;
    }

    get(i) {
        if (i >= 0 && i < this.numbers.length && this.numbers.length > 0) {
            return this.numbers[i];
        }
    }
}


let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
list.remove(1);
console.log(list.get(1));
