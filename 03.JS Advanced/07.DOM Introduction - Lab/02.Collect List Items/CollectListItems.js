function extractText() {
    let text = [];
    items = Array.from(document.getElementsByTagName('li'));
    items.forEach( el => text.push(el.textContent));
    document.getElementById('result').value = text.join('\n');
}