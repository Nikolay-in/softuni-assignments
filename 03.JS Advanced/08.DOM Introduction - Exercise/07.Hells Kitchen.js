function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick () {
      let input = JSON.parse(document.getElementsByTagName('textarea')[0].value);
      if (input) {
         let restaurants = {};
         for (line of input) {
            let [restaurant, workers] = line.split(' - ');
            if (!restaurants.hasOwnProperty(restaurant)) {
               restaurants[restaurant] = {
                  workers: {},
                  avg: 0,
                  best: 0
               };
            }
            workers = workers.split(', ');
            for (let worker of workers) {
               let [workerName, salary] = worker.split(' ');
               salary = Number(salary);
               restaurants[restaurant]['workers'][workerName] = salary;
               if (salary > restaurants[restaurant].best) {
                  restaurants[restaurant].best = Number(salary.toFixed(2));
               }
            }
            let totalSalaries = Object.values(restaurants[restaurant]['workers']).map(Number).reduce((a, b) => a + b);
            let workersCount = Object.keys(restaurants[restaurant]['workers']).length;
            restaurants[restaurant].avg = Number((totalSalaries / workersCount).toFixed(2));
         }
         let best = {
            rName: '',
            avg: 0
         };
         for (let [restaurant, info] of Object.entries(restaurants)) {
            if (info.avg > best.avg) {
               best.rName = restaurant;
               Object.assign(best, restaurants[restaurant]);
            }
         }
         let bestRestaurantString = `Name: ${best.rName} Average Salary: ${best.avg.toFixed(2)} Best Salary: ${best.best.toFixed(2)}`;
         document.querySelector('#bestRestaurant p').textContent = bestRestaurantString;
         let bestWorkers = Object.entries(best.workers).sort((a, b) => b[1] - a[1]).map( el => `Name: ${el[0]} With Salary: ${el[1]}`);
         document.querySelector('#workers p').textContent = bestWorkers.join(' ');
      }
   }
}