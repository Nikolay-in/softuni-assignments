function attachEvents() {

    // Get fields
    let phoneUl = document.getElementById('phonebook');
    let person = document.getElementById('person');
    let phone = document.getElementById('phone');
    let loadBtn = document.getElementById('btnLoad');
    let createBtn = document.getElementById('btnCreate');

    // Add Event handlers
    loadBtn.addEventListener('click', onLoadClick);
    createBtn.addEventListener('click', onCreateClick);

    // Load function
    async function onLoadClick() {
        let response = await fetch('http://localhost:3030/jsonstore/phonebook');

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        let data = await response.json();
        data = Object.values(data);

        // Clear phonebook list
        phoneUl.innerHTML = '';

        data.forEach(x => {
            // Create li
            let li = document.createElement('li')
            li.id = x._id;
            li.textContent = `${x.person}: ${x.phone}`;

            // Delete button
            let delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.addEventListener('click', delListItem);
            li.appendChild(delBtn);

            // Add li to phonebook list
            phoneUl.appendChild(li);
        });
    }

    // Delete list item function
    async function delListItem(e) {
        let id = e.target.parentElement.id;

        let response = await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
            method: 'delete'
        });

        //Delete list item from DOM if its deleted on the server
        if (response.ok) {
            e.target.parentElement.remove();
        } else {
            throw new Error(response.statusText);
        }
    }

    // Create entry function
    async function onCreateClick() {

        // Create entry only if fields are not empty
        if (person.value && phone.value) {

            // Object to send
            let bodyObject = {
                "person": person.value,
                "phone": phone.value
            }

            response = await fetch('http://localhost:3030/jsonstore/phonebook', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(bodyObject)
            });

            if (response.ok) {

                // Get id entry
                let data = await response.json();
                let id = data._id

                //Add list item to phonebook
                let li = document.createElement('li');
                li.textContent = `${person.value}: ${phone.value}`;
                li.id = id;
                phoneUl.appendChild(li);

                // Delete button
                let delBtn = document.createElement('button');
                delBtn.textContent = 'Delete';
                delBtn.addEventListener('click', delListItem);
                li.appendChild(delBtn);
                
                // Empty fields
                person.value = '';
                phone.value = '';
                
            } else {
                throw new Error(response.statusText);
            }
        } 
    }
}

attachEvents();