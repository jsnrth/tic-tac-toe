var assert = require('assert');
var Board = require('../lib/board');

var pla1 = 'x';
var pla2 = 'o';

describe('Board', function(){
    describe('Winning', function(){
        it('has no winner when empty', function(){
            var board = [null, null, null, null, null, null, null, null, null];
            assert.equal(null, Board.getWinner(board));
        });

        it('wins with three across the top row', function(){
            var board = [pla1, pla1, pla1, null, null, null, null, null, null];
            assert.equal(pla1, Board.getWinner(board));
        });

        it('wins with three across the middle row', function(){
            var board = [null, null, null, pla1, pla1, pla1, null, null, null];
            assert.equal(pla1, Board.getWinner(board));
        });

        it('wins with three across the bottom row', function(){
            var board = [null, null, null, null, null, null, pla1, pla1, pla1];
            assert.equal(pla1, Board.getWinner(board));
        });

        it('wins with three down the first column', function(){
            var board = [pla1, null, null, pla1, null, null, pla1, null, null];
            assert.equal(pla1, Board.getWinner(board));
        });

        it('wins with three down the second column', function(){
            var board = [null, pla1, null, null, pla1, null, null, pla1, null];
            assert.equal(pla1, Board.getWinner(board));
        });

        it('wins with three down the third column', function(){
            var board = [null, null, pla1, null, null, pla1, null, null, pla1];
            assert.equal(pla1, Board.getWinner(board));
        });

        it('wins with three diagonally left', function(){
            var board = [pla1, null, null, null, pla1, null, null, null, pla1];
            assert.equal(pla1, Board.getWinner(board));
        });

        it('wins with three diagonally right', function(){
            var board = [null, null, pla1, null, pla1, null, pla1, null, null];
            assert.equal(pla1, Board.getWinner(board));
        });

        it('cannot have more than one winning combo', function(){
            assert.throws(
                function(){
                    var board = [pla1, pla1, pla1, pla1, pla1, pla1, pla1, pla1, pla1];
                    return Board.getWinner(board);
                },
                /More than one winning combination is not allowed/
            );
        });

        it('cannot have more than one winner', function(){
            assert.throws(
                function(){
                    var board = [pla1, pla1, pla1, pla2, pla2, pla2, null, null, null];
                    return Board.getWinner(board);
                },
                /Both players cannot win/
            );
        });

        it('must have a valid board', function(){
            assert.throws(
                function(){
                    var board = [];
                    return Board.getWinner(board);
                },
                /Invalid board/
            );

            assert.throws(
                function(){
                    var board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
                    return Board.getWinner(board);
                },
                /Invalid board/
            );
        });

        it('can only play X or O', function(){
            assert.throws(
                function(){
                    var board = ['wut', null, null, null, null, null, null, null, null];
                    return Board.getWinner(board);
                },
                /Invalid player on board/
            );
        });
    });

    describe('Updating', function(){
        it('updates the board', function(){
            var board = [null, null, null, null, null, null, null, null, null];
            var updated = Board.update(board, 'x', 2);
            assert.equal('x', updated[2]);
            assert.notEqual(board, updated);
        });

        it('can only update valid players', function(){
            assert.throws(
                function(){
                    var board = [null, null, null, null, null, null, null, null, null];
                    Board.update(board, 'foo', 2);
                },
                /Invalid player/
            );
        });

        it('can only update valid boards', function(){
            assert.throws(
                function(){
                    var board = [];
                    Board.update(board, 'x', 2);
                },
                /Invalid board/
            );
        });

        it('can only play each cell one time', function(){
            assert.throws(
                function(){
                    var board = [null, 'x', null, null, null, null, null, null, null];
                    Board.update(board, 'x', 1);
                },
                /Cell already taken/
            );
        });
    });

    describe('Remaining moves', function(){
        it('counts remaining moves', function(){
            assert.equal(9, Board.remainingMoves([null, null, null, null, null, null, null, null, null]));
            assert.equal(2, Board.remainingMoves(['x', null, 'o', 'x', null, 'x', 'o', 'x', 'o']));
        });
    });
});
