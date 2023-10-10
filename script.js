let player1;
let player2;
let gameBoard;
let displayController;

init();

function init() {

    player1 = createPlayer('Player 1', 'X');
    player2 = createPlayer('Player 2', 'O');

    gameBoard = (function(player1, player2) {
      
        const _player1 = player1;
        const _player2 = player2;
        let _activePlayer = _player1;
        const _game = new Array(9).fill(null);

        function switchActivePlayer() {
            if (_activePlayer === _player1) {
                _activePlayer = _player2;
            } else {
                _activePlayer = _player1;
            }
        }
        
        function getActivePlayer() {
            return _activePlayer;
        }
        
        function addPlay(index) {
            if (_game[index]) {
                alert('No Plays available in that space');
                return;
            }
            _game[index] = _activePlayer;
        }

        function getPlay(index) {
            return _game[index];
        }
        
        function getWinner() {
            if (_game[0] && _game[0] === _game[1] && _game[0] === _game[2]) {
                return _game[0];
            }
            if (_game[3] && _game[3] === _game[4] && _game[3] === _game[5]) {
                return _game[3];
            }
            if (_game[6] && _game[6] === _game[7] && _game[6] === _game[8]) {
                return _game[6];
            }
            if (_game[0] && _game[0] === _game[3] && _game[0] === _game[6]) {
                return _game[0];
            }
            if (_game[1] && _game[1] === _game[4] && _game[1] === _game[7]) {
                return _game[1];
            }
            if (_game[2] && _game[2] === _game[5] && _game[2] === _game[8]) {
                return _game[2];
            }
            if (_game[0] && _game[0] === _game[4] && _game[0] === _game[8]) {
                return _game[0];
            }
            if (_game[2] && _game[2] === _game[4] && _game[2] === _game[6]) {
                return _game[2];
            }
            return null;
        }

        function isGameOver() {
            return _game.every(play => play);
        }
        
        return {
            switchActivePlayer,
            getActivePlayer,
            addPlay,
            getPlay,
            getWinner,
            isGameOver,
        }

    })(player1, player2);

    displayController = (function() {
        const _cellElements = document.querySelectorAll('.cell');
        const _gameboardElement = document.querySelector('.gameboard');
        const _newGameButton = document.querySelector('.new-game');
        const _userMessage = document.querySelector('.message');
        
        function addListeners() {
           _gameboardElement.addEventListener('click', evt => {
                const cell = evt.target.closest('.cell');
                if (cell.textContent !== '') {
                    return;
                }        
                const index = cell.dataset.index;
                gameBoard.addPlay(index);
                gameBoard.switchActivePlayer();
                render();
           });

           _newGameButton.addEventListener('click', init);
        }

        function render() {
            let message;
            const winner = gameBoard.getWinner();
            if (winner) {
                message = `Game Over! ${winner.name} wins. Click 'New Game' to play again.`;
            } else if (gameBoard.isGameOver()) {
                message = `Game Over! No more moves available. Click 'New Game' to play again.`;
            } else {
                message = `${gameBoard.getActivePlayer().name}'s turn`;
            }
            _userMessage.textContent = message;

           _cellElements.forEach((cell, index) => {
                const symbol = gameBoard.getPlay(index)?.symbol;
                cell.textContent = symbol;
           })
        } 

        return {
         addListeners,
         render,
        }
    })();

    displayController.addListeners();
    displayController.render();
}


function createPlayer(name, symbol) {
    return {name, symbol};
}


