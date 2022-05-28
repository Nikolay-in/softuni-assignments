function editElement(el, match, replace) {
    let regex = new RegExp(match, 'g');
    el.textContent = el.textContent.replace(regex, replace);
}