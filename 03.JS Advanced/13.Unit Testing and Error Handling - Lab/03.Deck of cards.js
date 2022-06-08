function printDeckOfCards(cards) {
    function createCard(f, s) {
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

        if (faces.indexOf(f) == -1 || suits.hasOwnProperty(s) === false) {
            throw new Error('Invalid card: ' + f + s);
        } else {
            card.face = f;
            card.suit = suits[s];
        }
        
        return card;
    }

    try {
        let deck = [];
        for (let cardInput of cards) {
            let face = cardInput.slice(0, -1);
            let suit = cardInput.slice(-1);
            let card = createCard(face, suit);
            deck.push(card);
        }
        console.log(deck.join(' '));
    } catch (ex) {
        console.log(ex.message);
    }
}

printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['5S', '3D', 'QD', '1C']);