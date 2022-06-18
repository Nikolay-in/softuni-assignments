class VegetableStore {
    constructor(owner, location) {
        this.owner = owner;
        this.location = location;
        this.availableProducts = [];
    }

    loadingVegetables(vegetables) {
        let products = new Set;
        for (let line of vegetables) {
            let [type, quantity, price] = line.split(' ');

            let productIndex = this.availableProducts.findIndex(el => el.type === type);
            if (productIndex !== -1) {
                this.availableProducts[productIndex].quantity += Number(quantity);

                if (Number(price) > this.availableProducts[productIndex].price) {
                    this.availableProducts[productIndex].price = Number(price);
                }
            } else {
                this.availableProducts.push({
                    type,
                    quantity: Number(quantity),
                    price
                });
            }
            products.add(type);
        }

        return `Successfully added ${Array.from(products.values()).join(', ')}`;
    }

    buyingVegetables(selectedProducts) {
        let total = 0;

        for (let line of selectedProducts) {
            let [type, quantity] = line.split(' ');

            let typeIndex = this.availableProducts.findIndex(el => el.type === type);
            if (typeIndex === -1) {
                throw new Error(`${type} is not available in the store, your current bill is $${total.toFixed(2)}.`);
            }

            if (Number(quantity) > this.availableProducts[typeIndex].quantity) {
                throw new Error(`The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${total.toFixed(2)}.`);
            }

            let cost = this.availableProducts[typeIndex].price * Number(quantity);
            this.availableProducts[typeIndex].quantity -= Number(quantity);
            total += cost;
        }

        return `Great choice! You must pay the following amount $${total.toFixed(2)}.`;
    }

    rottingVegetable(type, quantity) {
        let typeIndex = this.availableProducts.findIndex(el => el.type === type);
        if (typeIndex === -1) {
            throw new Error(`${type} is not available in the store.`);
        }

        if (quantity > this.availableProducts[typeIndex].quantity) {
            this.availableProducts[typeIndex].quantity = 0;
            return `The entire quantity of the ${type} has been removed.`;
        }

        this.availableProducts[typeIndex].quantity -= quantity;
        return `Some quantity of the ${type} has been removed.`;
    }

    revision() {
        let products = this.availableProducts.sort((a, b) => a.price - b.price);
        products = products.map(el => `${el.type}-${el.quantity}-$${el.price}`);
        if (products.length > 0) { products.unshift(''); }
        return `Available vegetables:${products.join('\n')}\nThe owner of the store is ${this.owner}, and the location is ${this.location}.`;
    }
}

let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta, Sofia");
console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8", "Celery 5.5 2.2", "Celery 0.5 2.5"]));
console.log(vegStore.rottingVegetable("Okra", 1));
console.log(vegStore.rottingVegetable("Okra", 2.5));
console.log(vegStore.buyingVegetables(["Beans 8", "Celery 1.5"]));
console.log(vegStore.revision());

