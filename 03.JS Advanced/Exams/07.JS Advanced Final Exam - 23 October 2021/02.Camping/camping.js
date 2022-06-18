class SummerCamp {
    constructor(organizer, location) {
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = { "child": 150, "student": 300, "collegian": 500 };
        this.listOfParticipants = [];
    }

    registerParticipant(name, condition, money) {
        if (!this.priceForTheCamp[condition]) {
            throw new Error('Unsuccessful registration at the camp.');
        }

        if (this.listOfParticipants.find(el => el.name === name)) {
            return `The ${name} is already registered at the camp.`;
        }

        if (money < this.priceForTheCamp[condition]) {
            return 'The money is not enough to pay the stay at the camp.';
        }

        this.listOfParticipants.push({
            name,
            condition,
            power: 100,
            wins: 0
        });
        return `The ${name} was successfully registered.`;
    }

    unregisterParticipant(name) {
        let participantIndex = this.listOfParticipants.findIndex(el => el.name === name);
        if (participantIndex === -1) {
            throw new Error(`The ${name} is not registered in the camp.`);
        }

        this.listOfParticipants.splice(participantIndex, 1);
        return `The ${name} removed successfully.`;
    }

    timeToPlay(typeOfGame, ...participants) {
        participants.forEach(name => {
            if (!this.listOfParticipants.find(el => el.name === name)) {
                throw new Error('Invalid entered name/s.');
            }
        });

        if (participants.length == 2) {
            let p1 = this.listOfParticipants.find(el => el.name === participants[0]);
            let p2 = this.listOfParticipants.find(el => el.name === participants[1]);
            if (p1.condition !== p2.condition) {
                throw new Error('Choose players with equal condition.');
            }
        }

        if (typeOfGame === 'Battleship') {
            let participantIndex = this.listOfParticipants.findIndex(el => el.name === participants[0]);
            this.listOfParticipants[participantIndex].power += 20;
            return `The ${participants[0]} successfully completed the game ${typeOfGame}.`;
        }

        if (typeOfGame === 'WaterBalloonFights') {
            let p1Index = this.listOfParticipants.findIndex(el => el.name === participants[0]);
            let p2Index = this.listOfParticipants.findIndex(el => el.name === participants[1]);
            if (this.listOfParticipants[p1Index].power === this.listOfParticipants[p2Index].power) {
                return 'There is no winner.';
            }

            if (this.listOfParticipants[p1Index].power > this.listOfParticipants[p2Index].power) {
                this.listOfParticipants[p1Index].wins++;
                return `The ${participants[0]} is winner in the game ${typeOfGame}.`;
            } else if (this.listOfParticipants[p1Index].power < this.listOfParticipants[p2Index].power) {
                this.listOfParticipants[p2Index].wins++;
                return `The ${participants[1]} is winner in the game ${typeOfGame}.`;
            }
        }
    }

    toString() {
        let participants = this.listOfParticipants.sort((a, b) => b.wins - a.wins);
        participants = participants.map(el => Object.values(el).join(' - '));
        return `${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}\n${participants.join('\n')}`;
    }
}


const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
console.log(summerCamp.timeToPlay("Battleship", "Petar Petarson"));
console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200));
// console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Sara Dickinson"));
console.log(summerCamp.registerParticipant("Dimitur Kostov", "student", 300));
console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Dimitur Kostov"));

console.log(summerCamp.toString());
