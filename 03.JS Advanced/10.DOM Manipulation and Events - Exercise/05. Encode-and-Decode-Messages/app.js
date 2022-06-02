function encodeAndDecodeMessages() {
    let buttonEncode = document.querySelectorAll('button')[0];
    let buttonDecode = document.querySelectorAll('button')[1];
    let textArea1 = document.querySelectorAll('textarea')[0];
    let textArea2 = document.querySelectorAll('textarea')[1];
    buttonEncode.addEventListener('click', encodeText);
    buttonDecode.addEventListener('click', decodeText);
    function encodeText(e) {
        let text = textArea1.value;
        text = text.split('');
        text = text.map(e => String.fromCharCode(e.charCodeAt(0) + 1));
        text = text.join('');
        textArea1.value = '';
        textArea2.value = text;
    }
    function decodeText(e) {
        let text = textArea2.value;
        text = text.split('');
        text = text.map(e => String.fromCharCode(e.charCodeAt(0) - 1));
        text = text.join('');
        textArea2.value = text;
    }
}