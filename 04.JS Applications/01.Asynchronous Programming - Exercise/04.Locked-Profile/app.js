function lockedProfile() {
    let mainDiv = document.querySelector('main#main');
    mainDiv.innerHTML = '';

    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then(res => res.json())
        .then(data => handleUsers(data))
        .catch((e) => { throw new Error(e) });

    function handleUsers(users) {
        Object.values(users).forEach((el, i) => handleUser(el, i));

        let buttons = Array.from(document.querySelectorAll('button'));

        buttons.forEach(button => button.addEventListener('click', handleClick));
    }

    function handleClick(e) {
        let checkedRadio = e.target.parentElement.querySelector('input[type=radio]:checked');

        if (checkedRadio.value == 'unlock' && e.target.previousElementSibling.style.display == '') {
            e.target.previousElementSibling.style.display = 'none';
        } else if (checkedRadio.value == 'unlock' && e.target.previousElementSibling.style.display == 'none') {
            e.target.previousElementSibling.style.display = '';
        }
    }

    function handleUser(user, i) {
        //Profile div
        let profileDiv = document.createElement('div');
        profileDiv.className = 'profile';

        profileDiv.innerHTML = `<img src=\"./iconProfile2.png\" class=\"userIcon\" />
        <label>Lock</label>
        <input type=\"radio\" name=\"user${i + 1}Locked\" value=\"lock\" checked>
        <label>Unlock</label>
        <input type=\"radio\" name=\"user${i + 1}Locked\" value=\"unlock\"><br>
        <hr>
        <label>Username</label>
        <input type=\"text\" name=\"user${i + 1}Username\" value=\"${user.username}\" disabled readonly />
        <div id=\"user${i + 1}HiddenFields\">
            <hr>
            <label>Email:</label>
            <input type=\"email\" name=\"user${i + 1}Email\" value=\"${user.email}\" disabled readonly />
            <label>Age:</label>
            <input type=\"email\" name=\"user${i + 1}Age\" value=\"${user.age}\" disabled readonly />
        </div>
        <button>Show more</button>`;

        mainDiv.appendChild(profileDiv);
    }
}