function attachEvents() {
    
    // Get elements
    let messages = document.getElementById('messages');
    let recipient = document.querySelectorAll('div#controls input[name="author"]')[0];
    let content = document.querySelectorAll('div#controls input[name="content"]')[0];
    let btnSubmit = document.getElementById('submit');
    let btnRefresh = document.getElementById('refresh');

    // Add event handlers
    btnSubmit.addEventListener('click', onSubmit);
    btnRefresh.addEventListener('click', onRefresh);

    // On submit
    function onSubmit() {

        //Fetch only if values are filled
        if (recipient.value && content.value) {
            let output = {
                author: recipient.value,
                content: content.value
            }

            fetch('http://localhost:3030/jsonstore/messenger', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(output)
            });

            recipient.value = '';
            content.value = '';
        }
    }

    // On refresh
    function onRefresh() {

        fetch('http://localhost:3030/jsonstore/messenger')
            .then(res => res.json())
            .then(data => {
                const result = Object.values(data).map(x => x.author + ': ' + x.content).join('\n');
                messages.value = result;
            })
            .catch(e => console.log(e));
    }
}

attachEvents();