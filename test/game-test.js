var assert = require('assert');
var Game = require('../lib/game');

describe('Game', function(){
    it('starts a new game', function(){
        var game = Game.newGame();
        assert.deepEqual(game.board, [null, null, null, null, null, null, null, null, null]);
        assert.equal(game.player, 'x');
        assert.equal(game.opponent, 'o');
        assert.equal(game.moves, 9);
        assert.equal(game.winner, null);
    });

    it('makes the next move', function(){
        var game = Game.newGame();
        var updatedGame = Game.move(game, 1);
        assert.deepEqual(updatedGame.board, [null, 'x', null, null, null, null, null, null, null]);
        assert.equal(updatedGame.player, 'o');
        assert.equal(updatedGame.opponent, 'x');
        assert.equal(updatedGame.moves, 8);
        assert.equal(game.winner, null);
    });

    it('calls out the winner', function(){
        var game = Game.newGame();
        game.board = ['x', 'x', null, 'o', 'o', null, null, null, null];
        game.player = 'x';

        var updatedGame = Game.move(game, 2);
        assert.deepEqual(updatedGame.board, ['x', 'x', 'x', 'o', 'o', null, null, null, null]);
        assert.equal(updatedGame.winner, 'x');
    });

    it('blows up when the game is already done', function(){
        assert.throws(
            function(){
                var game = Game.newGame();
                game.board = ['x', 'x', 'o', 'o', 'o', 'x', 'x', 'o', 'x'];
                game.player = 'o';
                Game.move(game, 5);
            },
            /Game is already done/
        );
    });

    it('blows up when the game is already done', function(){
        assert.throws(
            function(){
                var game = Game.newGame();
                game.board = ['x', 'x', 'x', 'o', 'o', 'x', 'o', 'o', null];
                game.player = 'x';
                game.opponent = 'o';
                Game.move(game, 8);
            },
            /Game has already been won/
        );
    });
});
