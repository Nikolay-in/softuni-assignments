function ticTacToe(input) {
    let board = [[false, false, false],
    [false, false, false],
    [false, false, false]];
    let mark = 'X';
    let marks = 0;
    for (let index = 0; index < input.length; index++) {
        let i = input[index].split(' ')[0];
        let j = input[index].split(' ')[1];
        if (board[i][j]) {
            console.log("This place is already taken. Please choose another!");
            continue;
        }
        board[i][j] = mark;
        marks++;
        if (checkStatus(i, j, mark, marks)) {
            break;
        }
        mark = (mark == 'X') ? 'O' : 'X';
    }

    function checkStatus(i, j, mark) {
        let won = false;
        if (board[i][0] == mark && board[i][1] == mark && board[i][2] == mark) {
            won = mark;
        } else if (board[0][j] == mark && board[1][j] == mark && board[2][j] == mark) {
            won = mark;
        } else if (board[0][0] == mark && board[1][1] == mark && board[2][2] == mark) {
            won = mark;
        } else if (board[2][0] == mark && board[1][1] == mark && board[0][2] == mark) {
            won = mark;
        }
        //Diagonals

        if (won) {
            console.log(`Player ${mark} wins!`);
            board = board.map( el => el.join('\t'));
            console.log(board.join('\n'));
            return true;
        } else if (marks == 9) {
            console.log("The game ended! Nobody wins :(");
            board = board.map( el => el.join('\t'));
            console.log(board.join('\n'));
            return true;
        }
    }
}
ticTacToe(["0 1",
"0 0",
"0 2", 
"2 0",
"1 0",
"1 1",
"1 2",
"2 2",
"2 1",
"0 0"]


);