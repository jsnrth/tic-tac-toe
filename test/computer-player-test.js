"use strict";

var assert = require('assert');
var Game = require('../lib/game');
var Player = require('../lib/computer-player');

describe('Computer vs Computer', function(){
    it('will choose the winning move', function(){
        var game = Game.newGame();
        game.board = ['x', 'x', null, 'o', null, 'o', null, null, null];
        assert.equal(game.player, 'x');
        assert.equal(Player.getMove(game), 2);
    });

    it('will choose to block the opponent from winning', function(){
        var game = Game.newGame();
        game.board = ['x', null, null, 'o', 'o', null, 'x', null, null];
        assert.equal(game.player, 'x');
        assert.equal(Player.getMove(game), 5);
    });

    it('will always tie', function(){
        for(var i = 1; i <= 5; i++) {
            var game = Game.newGame();
            var move;
            while(game.winner == null && game.moves > 0){
                move = Player.getMove(game);
                game = Game.move(game, move);
            }
            assert.equal(game.winner, null, game.winner + " won round " + i + ", should have tied");
            assert.equal(game.moves, 0);
        }
    });
})
