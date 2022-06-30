function getInfo() {
    let stopId = document.getElementById('stopId').value;
    let stopName = document.getElementById('stopName');
    let busesUl = document.getElementById('buses');

    stopName.textContent = '';
    busesUl.innerHTML = '';
    
    fetch('http://localhost:3030/jsonstore/bus/businfo/' + stopId)
    .then(response => response.json())
    .then(data => {
        stopName.textContent = data.name;

        Object.entries(data.buses).forEach(([busId, time]) => {
            let li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${time} minutes`;
            busesUl.appendChild(li);
        });
    })
    .catch(() => {
        stopName.textContent = 'Error';
    });
}