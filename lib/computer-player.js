"use strict";

var Game = require('./game');
var Board = require('./board');

var MAX_SCORE = 10;
var MAX_DEPTH = 3;

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

function minimax(game, player, opponent, depth){
    depth || (depth = 0);
    if(game.winner == player)
        return MAX_SCORE - depth;
    else if(game.winner == opponent)
        return depth - MAX_SCORE;
    else if(game.moves === 0)
        return 0;
    else {
        var availableMoves = Board.availableMoves(game.board);
        var scores = [];
        availableMoves.forEach(function(move){
            if(depth > MAX_DEPTH) return;
            var sim = Game.move(game, move);
            var score = minimax(sim, player, opponent, depth + 1);
            scores.push(score);
        });

        if(game.player == player)
            return Math.max.apply(null, scores)
        else if(game.player == opponent)
            return Math.min.apply(null, scores);
        else
            throw new Error('why here?');
    }
}
