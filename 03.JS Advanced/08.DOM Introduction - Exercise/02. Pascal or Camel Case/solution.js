function solve() {
  let text = document.getElementById('text').value;
  let convention = document.getElementById('naming-convention').value;
  text = text.trim().split(' ');
  console.log(text);
  if (convention == 'Camel Case') {
    text[0] = text[0].toLowerCase();
    for (let i = 1; i < text.length; i++) {
      text[i] = text[i][0].toUpperCase() + text[i].slice(1).toLowerCase(); 
    }
  } else if (convention == 'Pascal Case') {
    text = text.map(e => e[0].toUpperCase() + e.slice(1).toLowerCase());
  } else {
    text = ['Error!'];
  }
  document.getElementById('result').textContent = text.join(''); 
}