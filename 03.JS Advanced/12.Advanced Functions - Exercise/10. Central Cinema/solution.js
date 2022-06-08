function solve() {
    let [onScreen, archive] = document.querySelectorAll('ul');
    archive.nextElementSibling.addEventListener('click', () => archive.innerHTML = '');
    document.querySelector('button').addEventListener('click', addOnScreen);

    function addOnScreen(e) {
        e.preventDefault();
        let [name, hall, price] = document.querySelectorAll('#container input');
        if (name.value && hall.value && Number(price.value) || price.value === '0') {
            onScreen.innerHTML +=
                `<li>
                    <span>${name.value}</span>
                    <strong>Hall: ${hall.value}</strong>
                    <div>
                      <strong>${price.value}</strong>
                      <input placeholder="Tickets Sold">
                      <button>Archive</button>
                    </div>
                </li>`;
                [name, hall, price].forEach(el => el.value = '');
        }

        Array.from(onScreen.querySelectorAll('button')).forEach(btn => btn.addEventListener('click', onArchive));
        function onArchive(btn) {
            let ticketPrice = btn.target.parentElement.children[0];
            let ticketsSold = btn.target.parentElement.children[1];
            if (Number(ticketsSold.value) || ticketsSold.value === '0') {
                archive.innerHTML +=
                    `<li>
                        <span>${btn.target.parentElement.parentElement.children[0].textContent}</span>
                        <strong>Total amount: ${(ticketPrice.textContent * ticketsSold.value).toFixed(2)}</strong>
                        <button>Delete</button>
                    </li>`;
                btn.target.parentElement.parentElement.remove();
                Array.from(archive.querySelectorAll('button')).forEach(btn => btn.addEventListener('click', (btn) => btn.target.parentElement.remove()));
            }
        }
    }
}