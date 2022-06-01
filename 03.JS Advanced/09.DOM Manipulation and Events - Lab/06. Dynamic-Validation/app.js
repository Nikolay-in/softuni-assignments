function validate() {
    let input = document.querySelector('input#email');
    input.addEventListener('change', check);

    function check(e) {
        let regex = new RegExp(/[a-z]+@[a-z]+\.[a-z]+/);
        if (regex.exec(e.target.value)) {
            e.target.className = '';
        } else {
            e.target.className = 'error';
        }
    }
}