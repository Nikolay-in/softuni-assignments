function attachEventsListeners() {
    let buttons = Array.from(document.querySelectorAll('input[type="button"]'));
    buttons.forEach(e => { e.addEventListener('click', convert) });
    function convert(e) {
        let input = Number(e.target.previousElementSibling.value);
        let type = e.target.previousElementSibling.id;
        let secs = 0;
        if (input) {
            if (type == 'days') {
                secs = input * 24 * 60 * 60;
            } else if (type == 'hours') {
                secs = input * 60 * 60;
            } else if (type == 'minutes') {
                secs = input * 60;
            } else if (type == 'seconds') {
                secs = input;
            }
        }
        let inputs = Array.from(document.querySelectorAll('div > input[type="text"]'));
        inputs.forEach(e => {
            if (e.id == 'days') {
                e.value = secs / 24 / 60 / 60;
            } else if (e.id == 'hours') {
                e.value = secs / 60 / 60;
            } else if (e.id == 'minutes') {
                e.value = secs / 60;
            } else if (e.id == 'seconds') {
                e.value = secs;
            }
        });
    }
}