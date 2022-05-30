function toggle() {
    let button = document.getElementsByClassName('button')[0];
    let textArea = document.getElementById('extra');
    if (textArea.style.display == 'none') {
        textArea.style.display = 'block';
        button.textContent = 'Less';
    } else {
        textArea.style.display = 'none';
        button.textContent = 'More';
    }
}