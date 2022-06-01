function focused() {
    let inputs = Array.from(document.querySelectorAll('input[type="text"]'));
    inputs.map(e => {
        e.addEventListener('focus', onFocus);
        e.addEventListener('blur', onBlur);
    });
    function onFocus(e) {
        e.target.parentElement.className = 'focused';
    }
    function onBlur(e) {
        e.target.parentElement.className = '';
    }
}