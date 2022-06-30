function solve() {
    let infoBox = document.querySelector('span.info');
    let departBtn = document.querySelector('input#depart');
    let arriveBtn = document.querySelector('input#arrive');
    let nextStop = 'depot';
    let currentStopName;

    function depart() {
        departBtn.setAttribute('disabled', '');
        arriveBtn.removeAttribute('disabled');
        
        fetch('http://localhost:3030/jsonstore/bus/schedule/' + nextStop)
        .then(res => res.json())
        .then(data => {
            nextStop = data.next;
            currentStopName = data.name;
            infoBox.textContent = `Next stop ${currentStopName}`;
        })
        .catch(() => {
            infoBox.textContent = 'Error';
            departBtn.setAttribute('disabled', '');
            arriveBtn.setAttribute('disabled', '');
        })
    }
    
    function arrive() {
        departBtn.removeAttribute('disabled');
        arriveBtn.setAttribute('disabled', '');
        infoBox.textContent = `Arriving at ${currentStopName}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();