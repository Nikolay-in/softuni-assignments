class Company {
    constructor() {
        this.departments = {}
    }

    addEmployee(name, salary, position, department) {
        if (!name || !salary || salary < 0 || !position || !department) {
            throw new Error('Invalid input!');
        }
        if (!this.departments.hasOwnProperty(department)) {
            this.departments[department] = [];
        }
        let employee = {
            name,
            salary,
            position
        }
        this.departments[department].push(employee);
        return `New employee is hired. Name: ${name}. Position: ${position}`;
    }

    bestDepartment() {
        let averages = Object.entries(this.departments);
        averages.forEach(el => {
            let departmentTotal = 0;
            el[1].forEach(el => departmentTotal += el.salary);
            let avg = departmentTotal / el[1].length;
            el[1] = avg.toFixed(2);
        });
        averages.sort((a, b) => b[1] - a[1]);
        let bestDepartment = averages[0][0];
        let bestDepAvg = averages[0][1];
        let output = `Best Department is: ${bestDepartment}\nAverage salary: ${bestDepAvg}`;
        let employees = this.departments[bestDepartment];
        employees.sort((a, b) => a.name.localeCompare(b.name));
        employees.sort((a, b) => b.salary - a.salary);
        employees = employees.map(el => Object.values(el).join(' '));
        return output + '\n' + employees.join('\n');
    }
}



let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
