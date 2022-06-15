function classes() {
    class Figure {
        constructor() {
            this.units = 'cm';
        }

        get area() {
        return this._area
        }

        changeUnits(unit) {
            if (unit == 'm' || unit == 'cm' || unit == 'mm') {
                this.units = unit;
            }
        }

        toString() {
            return `Figures units: ${this.units}`;
        }
    }

    class Circle extends Figure {
        constructor(radius) {
            super();
            this._radius = radius;
        }

        get radius() {
            if (this.units == 'm') {
            return this._radius / 100;
            } else if (this.units == 'mm') {
                return this._radius * 10;
            } else {
                return this._radius;
            }
        }

        set radius(radius) {
            this._radius = radius;
        }

        get area() {
        return Math.PI * this.radius ** 2;
        }

        toString() {
            return `Figures units: ${this.units} Area: ${this.area} - radius: ${this.radius}`;
        }
    }

    class Rectangle extends Figure {
        constructor(width, height, units) {
            super();
            this._width = width;
            this._height = height;
            this.units = units;
        }

        get width() {
            if (this.units == 'm') {
            return this._width / 100;
            } else if (this.units == 'mm') {
                return this._width * 10;
            } else {
                return this._width;
            }
        }

        set height(height) {
            this._height = height;
        }

        get height() {
            if (this.units == 'm') {
            return this._height / 100;
            } else if (this.units == 'mm') {
                return this._height * 10;
            } else {
                return this._height;
            }
        }

        set height(height) {
            this._height = height;
        }

        get area() {
            return this.width * this.height;
        }

        toString() {
            return `Figures units: ${this.units} Area: ${this.area} - width: ${this.width}, height: ${this.height}`;
        }
    }

    return {
        Figure,
        Circle,
        Rectangle
    }
}



// let c = new Circle(5);
// console.log(c.area); // 78.53981633974483
// console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

// let r = new Rectangle(3, 4, 'mm');
// console.log(r.area); // 1200 
// console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

// r.changeUnits('cm');
// console.log(r.area); // 12
// console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

// c.changeUnits('mm');
// console.log(c.area); // 7853.981633974483
// console.log(c.toString()) // Figures units: mm Area: 7853.981633974483 - radius: 50
