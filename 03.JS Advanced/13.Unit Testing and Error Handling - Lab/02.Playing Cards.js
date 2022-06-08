function cards(f, s) {
    let faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let suits = {
        'S': '\u2660',
        'H': '\u2665',
        'D': '\u2666',
        'C': '\u2663'
    }

    let card = {
        face: '',
        suit: '',
        toString() {
            return this.face + this.suit;
        }
    };

    if (faces.indexOf(f) == -1) {
        throw new Error('Invalid face');
    } else {
        card.face = f;
        card.suit = suits[s];
    }
    
    return card;
}