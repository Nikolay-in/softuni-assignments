function cityTaxes(name, population, treasury) {
    return {
        name,
        population,
        treasury,
        taxRate: 10,
        collectTaxes: function() {
            this.treasury += this.population * this.taxRate;
        },
        applyGrowth: function(a) {
            this.population *= 1 + a/100;
        },
        applyRecession: function(a) {
            this.treasury *= 1 - a/100;
        }
    }
}
const city =
  cityTaxes('Tortuga',
  7000,
  15000);
city.collectTaxes();
console.log(city.treasury);
city.applyGrowth(5);
console.log(city.population);
