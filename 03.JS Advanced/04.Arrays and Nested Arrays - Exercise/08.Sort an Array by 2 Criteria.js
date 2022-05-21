function sort(input) {
    input.sort((a, b) => a.localeCompare(b));
    input.sort((a, b) => a.length - b.length);
    console.log(input.join('\n'));
}
sort(['test', 
'Deny', 
'omen', 
'Default']

);