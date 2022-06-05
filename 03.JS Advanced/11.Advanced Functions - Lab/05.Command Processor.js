function solution() {
    return {
        string: '',
        append(input) {
            this.string += input;
        },
        removeStart(n) {
            this.string = this.string.slice(n);
        },
        removeEnd(n) {
            this.string = this.string.slice(0, -n);
        },
        print() {
            console.log(this.string);
        }
    }
}

let firstZeroTest = solution();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();
