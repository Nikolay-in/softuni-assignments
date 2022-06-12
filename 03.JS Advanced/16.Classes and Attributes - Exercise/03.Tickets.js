function tickets(input, criteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination,
            this.price = Number(price),
            this.status = status
        }

        static sortBy(a, b) {
            if (criteria == 'price') {
                return a.price - b.price;
            } else {
                return a[criteria].localeCompare(b[criteria]);
            }
        }
    }

    let output = [];
    input.forEach(el => {
        let [destination, price, status] = el.split('|');
        output.push(new Ticket(destination, price, status));
    });
    output.sort(Ticket.sortBy);
    return output;
}

console.log(tickets(['Philadelphia|94.20|available',
'New York City|95.99|available',
'New York City|95.99|sold',
'Boston|126.20|departed'],
'price'
));