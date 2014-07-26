var Board = require('./board');

module.exports.newGame = function(){
    var board = Board.newBoard();
    return {
        board: board,
        player: firstPlayer(),
        opponent: nextPlayer(firstPlayer()),
        moves: Board.remainingMoves(board),
        winner: null
    };
}

module.exports.move = function(game, position){
    validateGame(game);
    var updatedBoard = Board.update(game.board, game.player, position);
    return {
        board: updatedBoard,
        player: nextPlayer(game.player),
        opponent: game.player,
        moves: Board.remainingMoves(updatedBoard),
        winner: Board.getWinner(updatedBoard)
    };
};

function validateGame(game){
    if(Board.remainingMoves(game.board) <= 0)
        throw new Error('Game is already done');

    if(Board.getWinner(game.board) !== null)
        throw new Error('Game has already been won');
}

function firstPlayer(){
    return nextPlayer();
}

function nextPlayer(player){
    if(player == 'x')
        return 'o';
    else
        return 'x';
}
