function wordsUpperCase(input) {
    let regex = new RegExp(/(\w+)/, 'g');
    match = input.match(regex);
    match = match.map( el => el.toUpperCase() );
    console.log(match.join(', '));
}
wordsUpperCase('Hi');