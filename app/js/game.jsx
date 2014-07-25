var React = require('react');
var Board = require('./board');
var Banner = require('./banner');
var Game = require('../../lib/game');

module.exports = React.createClass({
    getInitialState: function(){
        return Game.newGame();
    },

    getBoard: function(){
        return this.state.board;
    },

    getStatus: function(){
        return {
            winner: this.state.winner,
            player: this.state.player,
            done: !!(this.state.winner || this.state.moves == 0)
        };
    },

    handleMove: function(position){
        try {
            this.replaceState(Game.move(this.state, position));
        }
        catch(e) {
            console.warn("Ignoring move: " + e.message);
        }
    },

    render: function(){
        return (
            <div>
                <Board board={this.getBoard()} handleMove={this.handleMove}/>
                <Banner status={this.getStatus()}/>
            </div>
        );
    }
});
