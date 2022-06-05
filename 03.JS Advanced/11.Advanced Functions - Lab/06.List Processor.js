function listProcessor(input) {
    let output = [];
    
    let commands = {
        add(word) {
            output.push(word);
        },
        remove(word) {
            output = output.filter(e => e != word);
        },
        print() {
            console.log(output.join(','));
        }
    }
    
    input.forEach(e => {
        let [command, word] = e.split(' ');
        commands[command](word);
    });
}

listProcessor(['add hello', 'add again', 'remove hello', 'add again', 'print']);