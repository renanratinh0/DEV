let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Linhas verticais
    [0, 4, 8], [2, 4, 6] // Diagonais
];

function makeMove(index) {
    if (board[index] === '' && !gameOver) {
        board[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;
        if (checkWinner(currentPlayer)) {
            document.getElementById('Titulo').innerText = 'Jogador ' + currentPlayer + ' venceu!';
            gameOver = true;
        } else if (!board.includes('')) {
            alert('Empate!');
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                makeComputerMove();
            }
        }
        document.getElementsByClassName('cell')[index].style.color = currentPlayer === 'X' ? 'red' : 'blue';
        document.getElementsByClassName('cell')[index].style.fontWeight = 'bold';

    }
}


function checkWinner(player) {
    for (let combination of winningCombinations) {
        if (board[combination[0]] === player &&
            board[combination[1]] === player &&
            board[combination[2]] === player) {
            return true;
        }
    }
    return false;
}

function makeComputerMove() {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = currentPlayer;

            let score = minimax(board, 0, false);

            board[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    setTimeout(() => {
        makeMove(bestMove);
    }, 500); // Adicionamos um pequeno atraso para dar a sensação de que o computador está "pensando"
}

const scores = {
    X: -10,
    O: 10,
    tie: 0
};

function minimax(board, depth, isMaximizing) {
    if (checkWinner('X')) {
        return scores.X + depth; // Aumenta a pontuação quando o jogador X ganha
    }
    if (checkWinner('O')) {
        return scores.O - depth; // Reduz a pontuação quando o jogador O ganha
    }
    if (!board.includes('')) {
        return scores.tie;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function resetBoard() {
    document.getElementById('Titulo').innerText = 'Jogo da Velha';

    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
}

// Event Listeners para as células do tabuleiro
let cells = document.getElementsByClassName('cell');
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function () {
        makeMove(i);
    });
}

// Event Listener para o botão de reiniciar
let resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', function () {
    resetBoard();
});

// Iniciar o jogo
makeComputerMove();

