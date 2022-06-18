class Bank {
    #bankName;
    constructor(bankName) {
        this.#bankName = bankName;
        this.allCustomers = [];
    }

    newCustomer(customer) {
        let haveCustomer = this.allCustomers.find(el => el.personalId == customer.personalId);
        if (haveCustomer) {
            throw new Error(`${haveCustomer.firstName} ${haveCustomer.lastName} is already our customer!`);
        }

        this.allCustomers.push(customer);
        return customer;
    }

    depositMoney(personalId, amount) {
        let customerIndex = this.allCustomers.findIndex(el => el.personalId == personalId);
        if (customerIndex === -1) {
            throw new Error('We have no customer with this ID!');
        }

        this.allCustomers[customerIndex].totalMoney = (!this.allCustomers[customerIndex].totalMoney) ? amount : this.allCustomers[customerIndex].totalMoney + amount;
        
        if (!this.allCustomers[customerIndex].transactions) {
            this.allCustomers[customerIndex].transactions = [];
        }
        this.allCustomers[customerIndex].transactions.unshift(`${this.allCustomers[customerIndex].transactions.length + 1}. ${this.allCustomers[customerIndex].firstName} ${this.allCustomers[customerIndex].lastName} made deposit of ${amount}$!`)
        
        return `${this.allCustomers[customerIndex].totalMoney}$`;
    }

    withdrawMoney(personalId, amount) {
        let customerIndex = this.allCustomers.findIndex(el => el.personalId == personalId);
        if (customerIndex === -1) {
            throw new Error('We have no customer with this ID!');
        }

        if (!this.allCustomers[customerIndex].totalMoney || this.allCustomers[customerIndex].totalMoney < amount) {
            throw new Error(`${this.allCustomers[customerIndex].firstName} ${this.allCustomers[customerIndex].lastName} does not have enough money to withdraw that amount!`);
        }

        this.allCustomers[customerIndex].totalMoney -= amount;

        if (!this.allCustomers[customerIndex].transactions) {
            this.allCustomers[customerIndex].transactions = [];
        }
        this.allCustomers[customerIndex].transactions.unshift(`${this.allCustomers[customerIndex].transactions.length + 1}. ${this.allCustomers[customerIndex].firstName} ${this.allCustomers[customerIndex].lastName} withdrew ${amount}$!`)
        
        return `${this.allCustomers[customerIndex].totalMoney}$`;
    }

    customerInfo(personalId) {
        let customerIndex = this.allCustomers.findIndex(el => el.personalId == personalId);
        if (customerIndex === -1) {
            throw new Error('We have no customer with this ID!');
        }

        return `Bank name: ${this.#bankName}\nCustomer name: ${this.allCustomers[customerIndex].firstName} ${this.allCustomers[customerIndex].lastName}\nCustomer ID: ${personalId}\nTotal Money: ${(this.allCustomers[customerIndex].totalMoney) ? this.allCustomers[customerIndex].totalMoney : 0}$\nTransactions:\n${(this.allCustomers[customerIndex].transactions) ? this.allCustomers[customerIndex].transactions.join('\n') : ''}`;
    }
}




let bank = new Bank('SoftUni Bank');

console.log(bank.newCustomer({firstName: 'Svetlin', lastName: 'Nakov', personalId: 6233267}));
console.log(bank.newCustomer({firstName: 'Mihaela', lastName: 'Mileva', personalId: 4151596}));

bank.depositMoney(6233267, 250);
console.log(bank.depositMoney(6233267, 250));
bank.depositMoney(4151596,555);

console.log(bank.withdrawMoney(6233267, 125));

console.log(bank.customerInfo(6233267));

