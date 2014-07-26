"use strict";

var WinningCombos = [
    // three across
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // three down
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // three diagonally
    [0, 4, 8],
    [2, 4, 6]
];

module.exports.newBoard = function(){
    return [null, null, null, null, null, null, null, null, null];
};

module.exports.getWinner = function(board){
    validateBoard(board);
    var xWins = winner('x', board);
    var yWins = winner('o', board);

    if(xWins && yWins)
        throw new Error('Both players cannot win');
    else if(xWins)
        return 'x';
    else if(yWins)
        return 'o';
    else
        return null;
};

module.exports.update = function(board, player, position){
    validateBoard(board);
    validatePlayer(player);
    validateMove(board, position);

    var cloned = board.slice();
    cloned[position] = player;
    return cloned;
};

module.exports.remainingMoves = function(board){
    return this.availableMoves(board).length;
};

module.exports.availableMoves = function(board){
    var moves = [];
    board.forEach(function(cell, i){
        if(cell === null)
            moves.push(i);
    });
    return moves;
};

function validateBoard(board){
    if(!isValidBoard(board))
        throw new Error('Invalid board: ' + board.toString());

    board.forEach(function(cell){
        if(!(isValidPlayer(cell) || cell === null))
            throw new Error('Invalid player on board: ' + cell.toString());
    });
};

function validatePlayer(player){
    if(!isValidPlayer(player))
        throw new Error('Invalid player: ' + player.toString());
}

function validateMove(board, position){
    if(board[position] !== null)
        throw new Error('Cell already taken: ' + board[position].toString());
}

function isValidPlayer(player){
    return player == 'x' || player == 'o';
}

function isValidBoard(board){
    return board.length === 9;
}

function winner(player, board){
    var i = 0;
    var l = WinningCombos.length;
    var winCount = 0;
    WinningCombos.forEach(function(combo){
        var p1 = combo[0];
        var p2 = combo[1];
        var p3 = combo[2];
        if(board[p1] == player && board[p2] == player && board[p3] == player)
            winCount += 1;
    });
    if(winCount === 0)
        return false;
    else if(winCount >= 1)
        return true;
}
