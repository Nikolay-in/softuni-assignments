export function setNavBar(nav) {
    const [dashboard, create, logout, login, register] = document.querySelectorAll('nav li');

    if (localStorage.getItem('userData')) {
        create.style.display = '';
        logout.style.display = '';
        login.style.display = 'none';
        register.style.display = 'none';
    } else {
        create.style.display = 'none';
        logout.style.display = 'none';
        login.style.display = '';
        register.style.display = '';
    }

    //Active current nav section
    [dashboard, create, logout, login, register].forEach(el => el.classList.remove('active'));

    const views = {
        'dashboard': dashboard,
        'create': create,
        'logout': logout,
        'login': login,
        'register': register
    }

    if (nav) {
        const selectedNav = views[nav];
        selectedNav.classList.add('active')
    }
}