function solve() {
    let [firstName, lastName, email, dob, position, salary] = Array.from(document.querySelectorAll('#signup form input'));
    let hireBtn = document.querySelector('button#add-worker');
    let table = document.querySelector('tbody#tbody');
    let totalSalaryField = document.querySelector('span#sum');

    function createTag(tag, text, className = null) {
        let el = document.createElement(tag);
        if (text != '') {
            el.textContent = text;
        }
        if (className) {
            el.className = className;
        }
        return el;
    }

    hireBtn.addEventListener('click', onHire);

    function onHire(e) {
        e.preventDefault();

        if (firstName.value && lastName.value && email.value && dob.value && position.value && salary.value) {
            let tr = document.createElement('tr');
            //Info
            tr.appendChild(createTag('td', firstName.value));
            tr.appendChild(createTag('td', lastName.value));
            tr.appendChild(createTag('td', email.value));
            tr.appendChild(createTag('td', dob.value));
            tr.appendChild(createTag('td', position.value));
            tr.appendChild(createTag('td', salary.value));

            //Buttons
            let firedBtn = createTag('button', 'Fired', 'fired');
            firedBtn.addEventListener('click', onFired);
            let editBtn = createTag('button', 'Edit', 'edit');
            editBtn.addEventListener('click', onEdit);
            td = document.createElement('td');
            td.appendChild(firedBtn);
            td.appendChild(editBtn);
            tr.appendChild(td);

            //Insert worker
            table.appendChild(tr);

            //Calc total salary
            let total = Number(totalSalaryField.textContent) + Number(salary.value);
            totalSalaryField.textContent = total.toFixed(2);

            //Clear fields
            [firstName, lastName, email, dob, position, salary].forEach(el => el.value = '');
        }

        function onFired(e) {
            let tr = e.target.parentElement.parentElement;
            let tds = Array.from(tr.children);

            //Decuct worker salary from total salary
            let workerSalary = Number(tds[5].textContent);
            let total = Number(totalSalaryField.textContent) - workerSalary;
            totalSalaryField.textContent = total.toFixed(2);

            //Delete worker from table
            tr.remove();
        }

        function onEdit(e) {
            let tr = e.target.parentElement.parentElement;
            let tds = Array.from(tr.children);
            tds.pop();

            //Fill input fields
            let inputFields = [firstName, lastName, email, dob, position, salary];
            for (let i = 0; i < tds.length; i++) {
                inputFields[i].value = tds[i].textContent;
            }

            //Decuct worker salary from total salary
            let workerSalary = Number(tds[5].textContent);
            let total = Number(totalSalaryField.textContent) - workerSalary;
            totalSalaryField.textContent = total.toFixed(2);

            //Delete worker from table
            tr.remove();
        }
    }
}
solve()