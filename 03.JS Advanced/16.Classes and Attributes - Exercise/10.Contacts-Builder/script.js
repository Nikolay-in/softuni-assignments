class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName,
        this.lastName = lastName,
        this.phone = phone,
        this.email = email,
        this._online = false
    }

    render(id) {
        let article = document.createElement('article');

        //Title
        let title = document.createElement('div');
        title.className = 'title';
        title.textContent = this.firstName + ' ' + this.lastName;
        if (this.online) {
            title.classList.add('online');
        }
        this.title = title;

        //Button
        let button = document.createElement('button');
        button.innerHTML = '&#8505;'
        title.appendChild(button);

        
        //Info
        let info = document.createElement('div');
        info.className = 'info';
        info.style.display = 'none';
        
        let spanPhone = document.createElement('span');
        spanPhone.innerHTML = '&phone; ' + this.phone;
        let spanEmail = document.createElement('span');
        spanEmail.innerHTML = '&#9993; ' + this.email;
        
        info.appendChild(spanPhone);
        info.appendChild(spanEmail);
        
        article.appendChild(title);
        article.appendChild(info);

        button.addEventListener('click', () => {
            info.style.display = (info.style.display == 'none') ? 'block' : 'none';
        });

        let output = document.getElementById(id);
        output.appendChild(article);
    }

    set online(value) {
        this._online = value;
        if (this.title) {
            if (value === true) { 
                this.title.classList.add('online');
            } else {
                this.title.classList.remove('online');
            }
        }
    }

    get online() {
      return this._online;
    }
}

let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
  ];
  contacts.forEach(c => c.render('main'));


setTimeout(() => contacts[1].online = true, 2000);