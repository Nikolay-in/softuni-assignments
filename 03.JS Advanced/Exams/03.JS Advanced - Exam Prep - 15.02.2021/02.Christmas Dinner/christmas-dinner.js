class ChristmasDinner {
    constructor(budget) {
        this.budget = budget;
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }

    set budget(budget) {
        if (budget < 0) {
            throw new Error('The budget cannot be a negative number');
        }

        this._budget = budget;
    }

    get budget() {
        return this._budget;
    }

    shopping(product) {
        if (product[1] > this.budget) {
            throw new Error('Not enough money to buy this product');
        }

        this.products.push(product[0]);
        this.budget -= product[1];
        return `You have successfully bought ${product[0]}!`;
    }

    recipes(recipe) {
        let allPresent = true;
        for (let el of recipe.productsList) {
            if (this.products.indexOf(el) === -1) {
                allPresent = false;
            }
        }

        if (!allPresent) {
            throw new Error('We do not have this product');
        }

        this.dishes.push(recipe);
        return `${recipe.recipeName} has been successfully cooked!`;
    }

    inviteGuests(name, dish) {
        let haveDish = false;
        for (let el of this.dishes) {
            if (el.recipeName === dish) {
                haveDish = true;
            }
        }

        if (!haveDish) {
            throw new Error('We do not have this dish');
        }
        
        if (this.guests.hasOwnProperty(name)) {
            throw new Error('This guest has already been invited');
        }

        this.guests[name] = dish;
        return `You have successfully invited ${name}!`;
    }

    showAttendance() {
        let guests = [];
        for (let guest in this.guests) {
            let dish = this.guests[guest];
            let { productsList } = this.dishes.find(o => o.recipeName === dish);
            guests.push(`${guest} will eat ${dish}, which consists of ${productsList.join(', ')}`);
        }
        return guests.join('\n');
    }
}