function createPlayer(name, symbol) {
    return {name, symbol};
}

const game = (function() {

    let player1, player2, activePlayer;
    let winner = null;

    function switchActivePlayer() {
        if (activePlayer === player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    }

    function startGame() {
        [player1, player2] = displayController.getPlayers();
        activePlayer = player1;
        winner = null;
        gameBoard.clear();
        displayController.newGame();
    }
    
    const gameBoard = (function() {
        
        let _game = new Array(9).fill(null);
    
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
    
        function addPlay(index, player) {
            if (_game[index]) {
                alert('No Plays available in that space');
                return;
            }
            _game[index] = player;
        }
    
        function getPlay(index) {
            return _game[index];
        }

        function clear() {
            _game = new Array(9).fill(null);
        }
        
        return {
            addPlay,
            getPlay,
            getWinner,
            isGameOver,
            clear,
        }
    
    })();

    const displayController = (function() {

        const _newGameModal = document.querySelector('.new-game-modal');
        const _startGameButton = document.querySelector('.start-game-button');
        const _cellElements = document.querySelectorAll('.cell');
        const _gameboardElement = document.querySelector('.gameboard');
        const _newGameButton = document.querySelector('.new-game');
        const _userMessage = document.querySelector('.message');
        let _isActive = true;
        
        function bindEvents() {
            _startGameButton.addEventListener('click', startGame);
            _gameboardElement.addEventListener('click', attemptPlay);
            _newGameButton.addEventListener('click', showWelcome);
        }
    
        function attemptPlay(event) {
            const cell = event.target.closest('.cell');
            if (cell.textContent !== '' || !_isActive) {
                return;
            }        
            const index = cell.dataset.index;
            gameBoard.addPlay(index, activePlayer);
            switchActivePlayer();
            winner = gameBoard.getWinner();
            if(winner || gameBoard.isGameOver()) {
                stopGame();
            }
            render();
        }
    
        function render() {
            let message;
            if (winner) {
                message = `Game Over! ${winner.name} wins.`;
            } else if (gameBoard.isGameOver()) {
                message = `Game Over! No more moves available.`;
            } else {
                message = `${activePlayer.name}'s turn`;
            }
            _userMessage.textContent = message;
           _cellElements.forEach((cell, index) => {
                const symbol = gameBoard.getPlay(index)?.symbol;
                cell.textContent = symbol;
           })
        } 
    
        function stopGame() {
            _isActive = false;
            _gameboardElement.classList.add('inactive');
        }
    
        function showWelcome() {
            _newGameModal.showModal();
        }
    
        function newGame() {
            _isActive = true;
            _gameboardElement.classList.remove('inactive');
            _newGameModal.close();
            render();
        }
    
        function getPlayers() {
            const p1Name = _newGameModal.querySelector('#player1-name').value;
            const p1Symbol = _newGameModal.querySelector('#player1-symbol').value;
            const p2Name = _newGameModal.querySelector('#player2-name').value;
            const p2Symbol = _newGameModal.querySelector('#player2-symbol').value;
            const player1 = createPlayer(p1Name, p1Symbol);
            const player2 = createPlayer(p2Name, p2Symbol);
            return [player1, player2];
        }
    
        return {
         bindEvents,
         showWelcome,
         getPlayers,
         newGame,
        }
    })();

    displayController.bindEvents();
    displayController.showWelcome();


})();



