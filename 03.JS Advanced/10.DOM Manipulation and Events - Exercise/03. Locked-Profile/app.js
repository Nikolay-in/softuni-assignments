function lockedProfile() {
    let buttons = Array.from(document.querySelectorAll('button'));
    buttons.forEach(e => e.addEventListener('click', toggleButton));

    function toggleButton(e) {
        let button = e.target;
        let lockStatus = e.target.parentElement.querySelector('input[type="radio"]:checked').value;
        if (lockStatus == 'unlock') {
            if (e.target.textContent == 'Show more' ) {
                e.target.previousElementSibling.style.display = 'block';
                e.target.textContent = 'Hide it';
            } else {
                e.target.previousElementSibling.style.display = 'none';
                e.target.textContent = 'Show more';
            }
        }
    }
}