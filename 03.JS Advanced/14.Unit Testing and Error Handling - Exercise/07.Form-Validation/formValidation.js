function validate() {
    const nameRegex = new RegExp(/^[a-zA-Z0-9]{3,20}$/);
    const passRegex = new RegExp(/^[\w]{5,15}$/);
    const emailRegex = new RegExp(/^[^@.]+@[^@]*\.[^@]*$/);
    const companyRegex = new RegExp(/^[1-9][0-9]{3}$/);

    const companyInfo = document.querySelector('fieldset#companyInfo');
    const checkBox = document.querySelector('#company[type="checkbox"]');
    checkBox.addEventListener('change', (e) => {
            companyInfo.style.display = (e.target.checked) ? 'block' : 'none';
    });

    const submitBtn = document.querySelector('button#submit');
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const userName = document.querySelector('input#username');
        const email = document.querySelector('input#email');
        const password = document.querySelector('input#password');
        const confirmPassword = document.querySelector('input#confirm-password');
        const companyNumber = document.querySelector('input#companyNumber');

        let validFields = [];
        let invalidFields = [];
        
        if (!nameRegex.exec(userName.value)) {
            invalidFields.push(userName);
        } else {
            validFields.push(userName);
        }

        if (!emailRegex.exec(email.value)) {
            invalidFields.push(email);
        } else {
            validFields.push(email);
        }

        if (!passRegex.exec(password.value) || password.value != confirmPassword.value) {
            invalidFields.push(password);
            invalidFields.push(confirmPassword);
        } else {
            validFields.push(password);
        }
        
        if (!passRegex.exec(confirmPassword.value) || password.value != confirmPassword.value) {
            invalidFields.push(password);
            invalidFields.push(confirmPassword);
        } else {
            validFields.push(confirmPassword);
        }

        if (checkBox.checked && !companyRegex.exec(companyNumber.value)) {
            invalidFields.push(companyNumber);
        } else {
            validFields.push(companyNumber);
        }

        invalidFields.forEach(el => { el.style.border = ''; el.style.borderColor = 'red'; });
        validFields.forEach(el => el.style.border = 'none');
        document.getElementById('valid').style.display = (invalidFields.length) ? 'none' : 'block';
    });
}
