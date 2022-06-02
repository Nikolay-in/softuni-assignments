function attachEventsListeners() {
    let button = document.querySelector('input#convert');
    button.addEventListener('click', convert);

    let input = document.querySelector('input#inputDistance');
    let output = document.querySelector('input#outputDistance');
    
    function convert(e) {
        let inputDistance = Number(input.value);
        let inputMeters = 0;
        let inputUnits = document.querySelector('#inputUnits').value;
        let outputUnits = document.querySelector('#outputUnits').value;
        switch (inputUnits) {
            case 'km': inputMeters = inputDistance * 1000; break;
            case 'cm': inputMeters = inputDistance / 100; break;
            case 'mm': inputMeters = inputDistance / 1000; break;
            case 'mi': inputMeters = inputDistance * 1609.34; break;
            case 'yrd': inputMeters = inputDistance * 0.9144 ; break;
            case 'ft': inputMeters = inputDistance * 0.3048; break;
            case 'in': inputMeters = inputDistance * 0.0254; break;
            default: inputMeters = inputDistance;
        }
        let outputDistance = 0;
        switch (outputUnits) {
            case 'km': outputDistance = inputMeters / 1000; break;
            case 'cm': outputDistance = inputMeters * 100; break;
            case 'mm': outputDistance = inputMeters * 1000; break;
            case 'mi': outputDistance = inputMeters / 1609.34; break;
            case 'yrd': outputDistance = inputMeters / 0.9144 ; break;
            case 'ft': outputDistance = inputMeters / 0.3048; break;
            case 'in': outputDistance = inputMeters / 0.0254; break;
            default: outputDistance = inputMeters;
        }
        output.value = outputDistance;
    }
}