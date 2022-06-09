function validate() {
    let regex = new RegExp(/^[a-z]+@[a-z]+\.[a-z]+$/);
    let emailInput = document.querySelector('input#email');
    emailInput.addEventListener('change', (e) => {
        if (!regex.exec(emailInput.value)) {
            e.target.className = 'error';
        } else {
            e.target.className = '';
        }
    });
}