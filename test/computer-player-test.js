"use strict";

var assert = require('assert');
var Game = require('../lib/game');
var Player = require('../lib/computer-player');

describe('Computer vs Computer', function(){
    it('will choose the winning move', function(done){
        var game = Game.newGame();
        game.board = ['x', 'x', null, 'o', null, 'o', null, null, null];
        assert.equal(game.player, 'x');
        Player.getMove(game).then(function(move){
            assert.equal(move, 2);
            done();
        })
        .fail(done);
    });

    it('will choose to block the opponent from winning', function(done){
        var game = Game.newGame();
        game.board = ['x', null, null, 'o', 'o', null, 'x', null, null];
        assert.equal(game.player, 'x');
        Player.getMove(game).then(function(move){
            assert.equal(move, 5);
            done();
        })
        .fail(done);
    });

    it('will tie a new game', function(done){
        this.timeout(5000);
        var play = function(game){
            if(game.winner || game.moves === 0){
                assert.equal(game.winner, null, game.winner + ' won, should have tied');
                assert.equal(game.moves, 0, game.moves + ' moves left, should be none');
                done();
            }
            else {
                Player.getMove(game)
                    .then(function(move){
                        play(Game.move(game, move));
                    })
                    .fail(done);
            }
        }
        play(Game.newGame());
    });
});
