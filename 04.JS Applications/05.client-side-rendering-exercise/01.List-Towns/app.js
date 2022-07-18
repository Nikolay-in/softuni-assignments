const rootDiv = document.getElementById('root');
const input = document.getElementById('towns');

document.getElementById('btnLoadTowns').addEventListener('click', (e) => {
    e.preventDefault();

    if (input.value) {

        const ul = document.createElement('ul');

        const towns = input.value.split(', ');

        towns.forEach(town => {
            const li = document.createElement('li');
            li.textContent = town;
            ul.appendChild(li);
        })

        rootDiv.appendChild(ul);

        input.value = '';
    }
});