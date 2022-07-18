// Get elements
let loadBooks = document.getElementById('loadBooks');
let tbody = document.querySelector('table tbody');
let formTitle = document.querySelector('form h3');
let [title, author] = document.querySelectorAll('form input')
let submitBtn = document.querySelector('form button');

// Add event listeners
loadBooks.addEventListener('click', getBooks)
submitBtn.addEventListener('click', onSubmit);
tbody.addEventListener('click', tableButtonClick);


// Get books function
async function getBooks() {
    let response = await fetch('http://localhost:3030/jsonstore/collections/books');

    if (response.ok) {
        let data = await response.json();
        tbody.innerHTML = '';

        // Add books
        Object.entries(data).forEach(([id, info]) => {
            let tr = document.createElement('tr');
            tr.innerHTML = `<tr>
                    <td>${info.title}</td>
                    <td>${info.author}</td>
                    <td>
                        <button data-id="${id}">Edit</button>
                        <button data-id="${id}">Delete</button>
                    </td>
                </tr>`;

            tbody.appendChild(tr);
        });
    } else {
        throw new Error(response.statusText)
    }
}


// Submit function
async function onSubmit(e) {
    e.preventDefault();

    //Check if fields are filled
    if (!title.value && !author.value) {
        alert('Both fields must be filled');
        return;
    }

    let bodyObj = {
        'author': author.value,
        'title': title.value
    }

    // If button is Submit
    if (!e.target.dataset.id) {
        let response = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(bodyObj)
        });

        if (response.ok) {

            let data = await response.json();

            // Create tr
            let tr = document.createElement('tr');
            tr.innerHTML = `<tr>
                    <td>${data.title}</td>
                    <td>${data.author}</td>
                    <td>
                        <button data-id="${data._id}">Edit</button>
                        <button data-id="${data._id}">Delete</button>
                    </td>
                </tr>`;

            tbody.appendChild(tr);

            // Clear fields
            title.value = '';
            author.value = '';
        } else {
            throw new Error(response.statusText);
        }
    } else {

        let id = e.target.dataset.id;

        let response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(bodyObj)
        });

        if (response.ok) {

            let data = await response.json();

            // Change tr
            console.log(data);


            // Change form title
            formTitle.textContent = 'FORM';

            // Clear fields
            title.value = '';
            author.value = '';

            //Change button
            submitBtn.textContent = 'Submit';
        } else {
            throw new Error(response.statusText);
        }
    }
}


// Table button click
function tableButtonClick(e) {

    if (e.target.tagName == 'BUTTON') {

        //Edit btn
        if (e.target.textContent == 'Edit') {
            console.log(e.target.dataset.id);

            // Get values
            let [titleValue, authorValue] = e.target.parentElement.parentElement.querySelectorAll('td');

            // Set input values
            title.value = titleValue.textContent;
            author.value = authorValue.textContent;

            // Change form h3
            formTitle.textContent = 'Edit FORM';
            
            // Change button
            submitBtn.textContent = 'Save';
            submitBtn.dataset.id = e.target.dataset.id;
        }
        

        //Delete btn
        if (e.target.textContent == 'Delete') {
            (async () => {
                // Make request
                let response = await fetch ('http://localhost:3030/jsonstore/collections/books/' + e.target.dataset.id, {
                    method: 'delete'
                });

                // Handle response
                if (response.ok) {
                    
                    // Delete from table 
                    e.target.parentElement.parentElement.remove()
                } else {
                    throw new Error(response.statusText)
                }
            })()
        }
    }
}