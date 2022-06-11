window.addEventListener('load', solution);

function solution() {
  let submitBtn = document.querySelector('input#submitBTN');
  let infoPreview = document.querySelector('ul#infoPreview');
  let formDivs = Array.from(document.querySelectorAll('div#form div'));
  let editBtn = document.querySelector('input#editBTN');
  let continueBtn = document.querySelector('input#continueBTN');

  submitBtn.addEventListener('click', () => {
    let fullName = document.querySelector('input#fname');
    let email = document.querySelector('input#email');
    if (fullName.value && email.value) {
      formDivs.forEach(div => {
        let label = div.getElementsByTagName('label')[0];
        let text = div.getElementsByTagName('input')[0];
        let li = document.createElement('li');
        li.textContent = `${label.textContent} ${text.value}`;
        infoPreview.appendChild(li);
        text.value = '';
        submitBtn.disabled = true;
        editBtn.disabled = false;
        continueBtn.disabled = false;
      });
    }
  });

  editBtn.addEventListener('click', () => {
    let lis = Array.from(document.querySelectorAll('ul#infoPreview li'));
    let inputs = Array.from(document.querySelectorAll('div#form input'));

    for (let i = 0; i < lis.length; i++) {
      let inputInfo = lis[i].textContent.split(': ')[1];
      inputs[i].value = inputInfo;
      lis[i].remove();
    }
    
    submitBtn.disabled = false;
    editBtn.disabled = true;
    continueBtn.disabled = true;
  });

  continueBtn.addEventListener('click', () => {
    let blockDiv = document.querySelector('div#block');
    let h3 = document.createElement('h3');
    h3.textContent = 'Thank you for your reservation!';
    blockDiv.innerHTML = '';
    blockDiv.appendChild(h3);
  });
}