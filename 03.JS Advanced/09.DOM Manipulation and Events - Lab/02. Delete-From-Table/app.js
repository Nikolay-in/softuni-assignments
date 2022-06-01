function deleteByEmail() {
    let input = document.querySelector('input[name="email"]');
    let email = input.value;
    let emails = Array.from(document.querySelectorAll('table#customers tbody tr td:nth-of-type(2)'));
    let found = false;
    for (el of emails) {
        if (el.textContent == email) {
            el.parentElement.remove();
            input.value = '';
            found = true;
        }
    }
    document.querySelector('div#result').textContent = (found) ? 'Deleted.' : 'Not found.';
}