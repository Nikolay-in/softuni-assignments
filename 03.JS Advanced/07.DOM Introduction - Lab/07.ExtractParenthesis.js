function extract(content) {
    let text = document.getElementById(content).textContent;
    let regex = new RegExp(/\((?<group>[a-zA-Z ]+?)\)/, 'g');
    let result = [];
    while (city = regex.exec(text)) {
        result.push(city[1]);
    }
    return result.join('; ');
}