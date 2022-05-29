function solve() {
  let text = document.getElementById('input').value;
  let sentences = text.split('.');
  if (sentences[sentences.length -1] == '') {
    sentences.pop();
  }
  let newText = '';
  let i = 1;
  for (let sentence of sentences) {
    if (i % 3 == 1) {
      newText += '<p>';
    }
    newText += sentence + '.';
    if (i % 3 == 0 || i == sentences.length) {
      newText += '</p>';
    }
    if (sentence) {
      i++;
    }
  }
  document.getElementById('output').innerHTML = newText;
}