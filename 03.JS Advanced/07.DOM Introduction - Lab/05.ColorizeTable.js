function colorize() {
    Array.from(document.querySelectorAll('tr:nth-of-type(2n)')).forEach(el => el.style.background = 'teal');
}