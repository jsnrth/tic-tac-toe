"use strict";

var Game = require('./game');
var Board = require('./board');

module.exports.getMove = function(game){
    if(game.winner || game.moves === 0)
        return null;

    var moves = Board.availableMoves(game.board);
    var scores = moves.map(function(move){
        var sim = Game.move(game, move);
        return minimax(sim, game.player, game.opponent, 0);
    });

    var index = scores.indexOf(Math.max.apply(null, scores));
    return moves[index];
}

function minimax(game, player, opponent){
    if(game.winner == player)
        return 1;
    else if(game.winner == opponent)
        return -1;
    else if(game.moves === 0)
        return 0;
    else {
        var moves = Board.availableMoves(game.board);
        var scores = moves.map(function(move){
            var sim = Game.move(game, move);
            return minimax(sim, player, opponent);
        });

        if(game.player == player)
            return Math.max.apply(null, scores);
        else if(game.player == opponent)
            return Math.min.apply(null, scores);
        else
            throw new Error('Cannot minmax invalid player: ' + game.player.toString());
    }
}
