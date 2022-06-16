(() => {
    Array.prototype.last = function() {
        return this[this.length - 1];
    };

    Array.prototype.skip = function(n) {
        return this.slice(n);
    };

    Array.prototype.take = function(n) {
        return this.slice(0, n);
    };

    Array.prototype.sum = function() {
        return this.reduce((a, b) => a + b);
    };

    Array.prototype.average = function() {
        return this.reduce((a, b) => a + b) / this.length;
    };
})();

var testArray = [1, 2, 3];

console.log( Array.prototype.hasOwnProperty('last'));
console.log( testArray.last());
console.log( testArray.skip(1));
console.log( testArray.skip(1));