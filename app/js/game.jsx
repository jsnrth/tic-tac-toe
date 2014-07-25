var React = require('react');
var Board = require('./board');
var Game = require('../../lib/game');

module.exports = React.createClass({
    getInitialState: function(){
        return Game.newGame();
    },

    getBoard: function(){
        return this.state.board;
    },

    handleMove: function(position){
        this.replaceState(Game.move(this.state, position));
    },

    render: function(){
        return (
            <Board board={this.getBoard()} handleMove={this.handleMove}/>
        );
    }
});
