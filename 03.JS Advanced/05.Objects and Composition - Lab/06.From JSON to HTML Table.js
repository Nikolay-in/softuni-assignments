function json(input) {
    function escapeHTML(value) {
        return value
          .toString()
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      }
    input = JSON.parse(input);
    let html = ['<table>'];
    let headings = Object.keys(input[0]);
    headingsEsc = headings.map(el => escapeHTML(el));
    html.push(`<tr><th>${headingsEsc.join('</th><th>')}</th></tr>`);
    for (el of input) {
        let studentInfo = Object.values(el);
        studentInfo = studentInfo.map(el => escapeHTML(el));
        let studentName = studentInfo.shift();
        html.push(`<tr><td>${studentName}</td><td>${studentInfo.join('</td><td>')}</td></tr>`);
    }
    html.push('</table>');
    console.log(html.join('\r\n'));
}
json(`[{"Na&me":"Pesho",
"Score":4,
"Grade":8},
{"Name":"Gosho",
"Score":5,
"Grade":8},
{"Name":"Angel",
"Score":5.50,
"Grade":10}]`
);

json(`[{"Name":"Stamat",
"Score":5.5},
{"Name":"Rumen",
"Score":6}]`
);