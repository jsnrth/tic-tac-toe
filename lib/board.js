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
}

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
}

function validateBoard(board){
    if(board.length !== 9)
        throw new Error('Invalid board: must have 9 cells');

    board.forEach(function(cell){
        if(!(cell === 'x' || cell === 'o' || cell === null))
            throw new Error('Invalid player on board: ' + cell.toString());
    });
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
    else if(winCount === 1)
        return true;
    else if(winCount > 1)
        throw new Error('More than one winning combination is not allowed');
}
