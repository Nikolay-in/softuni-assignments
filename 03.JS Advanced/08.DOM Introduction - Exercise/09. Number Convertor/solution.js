function solve() {
    let menuTo = document.getElementById('selectMenuTo');
    menuTo.innerHTML = '';
    let option1 = document.createElement('option');
    option1.setAttribute('value', 'binary');
    option1.textContent = 'Binary';
    menuTo.appendChild(option1);
    let option2 = document.createElement('option');
    option2.setAttribute('value', 'hexadecimal');
    option2.textContent = 'Hexadecimal';
    menuTo.appendChild(option2);

    let button = document.getElementsByTagName('button')[0];
    button.onclick = function() {
        let output = 0;
        let number = Number(document.getElementById('input').value);
        let selectedOption = document.querySelector('#selectMenuTo option:checked').value;
        if (selectedOption == 'binary') {
            output = number.toString(2);
        } else {
            output = number.toString(16).toUpperCase();
        }
        document.getElementById('result').value = output;
    }
}