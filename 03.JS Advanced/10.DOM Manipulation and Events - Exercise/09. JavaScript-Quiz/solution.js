function solve() {
  let questions = Array.from(document.querySelectorAll('section'));
  let result = document.querySelector('#results h1');
  let trueAnswers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents'];
  let points = 0;
  function submitAnswer(e) {
    let answerText = e.currentTarget.querySelector('p').textContent;
    if (trueAnswers.indexOf(answerText) != -1) {
      points++;
    }
    e.currentTarget.parentElement.parentElement.style.display = 'none';
    e.currentTarget.parentElement.parentElement.nextElementSibling.style.display = 'block';

    let resultString = (points < 3) ? `You have ${points} right answers` : `You are recognized as top JavaScript fan!`;
    result.textContent = resultString;
  }

  for (let i = 0; i < questions.length; i++) {
    let answers = Array.from(questions[i].querySelectorAll('li[class*="quiz-answer"]'));
    answers.forEach(e => { e.addEventListener('click', submitAnswer) });
  }
}