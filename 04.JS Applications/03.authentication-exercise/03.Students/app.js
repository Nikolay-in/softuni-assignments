//Get table body
const tbody = document.querySelector('table#results tbody');
const [firstName, lastName, facultyNumber, grade] = document.querySelectorAll('div.inputs input');
const submitBtn = document.getElementById('submit');

// Fetch students on page load
document.addEventListener('DOMContentLoaded', async () => { 

    let response = await fetch('http://localhost:3030/jsonstore/collections/students');

    if (response.ok) {
        let data = await response.json();

        // Add list item for each student
        Object.values(data).forEach(x => {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${x.firstName}</td><td>${x.lastName}</td><td>${x.facultyNumber}</td><td>${Number(x.grade).toFixed(2)}</td>`;
            console.log(x.grade);
            tbody.appendChild(tr);
        });

    } else {
        throw new Error(response.statusText)
    }
})

submitBtn.addEventListener('click', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    // Proceed if all values are filled
    if (!firstName.value || !lastName.value || !facultyNumber.value || !grade.value) {
        alert('All fields must be filled.');
        return;
    }

    let bodyObj = {
        'firstName': firstName.value,
        'lastName': lastName.value,
        'facultyNumber': facultyNumber.value,
        'grade': grade.value
    }

    // Send student info
    
    let response = await fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bodyObj)
        });

    if (response.ok) {

        // Create row element
        let tr = document.createElement('tr');
        tr.innerHTML = Object.values(bodyObj).map(x => `<td>${x}</td>`).join('');
        tbody.appendChild(tr);
        
        // Clear fields
        [firstName, lastName, facultyNumber, grade].forEach(x => x.value = '');

    } else {
        throw new Error(response.statusText);
    }
}