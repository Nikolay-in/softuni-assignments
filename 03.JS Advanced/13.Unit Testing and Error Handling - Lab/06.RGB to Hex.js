const { expect } = require('chai');

function rgbToHexColor(red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255)){
        return undefined; // Red value is invalid
    }
    if (!Number.isInteger(green) || (green < 0) || (green > 255)){
        return undefined; // Green value is invalid
    }
    if (!Number.isInteger(blue) || (blue < 0) || (blue > 255)){
        return undefined; // Blue value is invalid
    }
    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
}

describe('RGB to Hex', () => {
       
    it('Valid input', () => {
        expect(rgbToHexColor(255, 255, 255)).to.equal('#FFFFFF');
        expect(rgbToHexColor(0, 0, 0)).to.equal('#000000');
        expect(rgbToHexColor(0, 255, 0)).to.equal('#00FF00');
    });
    
    it('Valid input', () => {
        expect(rgbToHexColor(255, 255, 'string')).to.equal(undefined);
        expect(rgbToHexColor(255, 'string', 255)).to.equal(undefined);
        expect(rgbToHexColor('string', 255, 255)).to.equal(undefined);
        expect(rgbToHexColor()).to.equal(undefined);
        expect(rgbToHexColor(1, 2.4, 3)).to.equal(undefined);
    });

    it('Out of range upper limit', () => {
        expect(rgbToHexColor(256, 255, 255)).to.equal(undefined);
        expect(rgbToHexColor(255, 256, 255)).to.equal(undefined);
        expect(rgbToHexColor(255, 255, 256)).to.equal(undefined);
    });
    
    it('Out of range lower limit', () => {
        expect(rgbToHexColor(-255, 255, 255)).to.equal(undefined);
        expect(rgbToHexColor(255, -255, 255)).to.equal(undefined);
        expect(rgbToHexColor(255, 255, -255)).to.equal(undefined);
    });
});