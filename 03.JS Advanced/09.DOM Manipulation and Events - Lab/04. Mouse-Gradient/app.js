function attachGradientEvents() {
    let box = document.querySelector('div#gradient-box');
    box.addEventListener('mousemove', calculate);
    function calculate(e) {
        document.querySelector('div#result').textContent = Math.floor(e.offsetX/e.target.clientWidth * 100) + '%';
    }
}