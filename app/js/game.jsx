"use strict";

var React = require('react');
var Board = require('./board');
var Banner = require('./banner');
var Chooser = require('./chooser');
var Game = require('../../lib/game');
var MovesApi = require('../../lib/moves-api');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            game: Game.newGame(),
            playerX: null,
            playerO: null
        };
    },

    hasPlayers: function(){
        return (this.state.playerX && this.state.playerO);
    },

    chooseHumanPlayers: function(humans){
        this.setState({
            playerX: (humans.playerX ? 'human' : 'computer'),
            playerO: (humans.playerO ? 'human' : 'computer'),
        }, this.nextMove);
    },

    getBoard: function(){
        return this.state.game.board;
    },

    getStatus: function(){
        return {
            winner: this.state.game.winner,
            player: this.state.game.player,
            done: !!(this.state.game.winner || this.state.game.moves == 0)
        };
    },

    handleMove: function(position){
        this.setState({game: Game.move(this.state.game, position)}, this.nextMove);
    },

    getCurrentPlayer: function(){
        return this.state.game.player;
    },

    isCurrentPlayerComputer: function(){
        var currentPlayer = this.getCurrentPlayer();
        if(currentPlayer == 'x' && this.state.playerX == 'computer')
            return true;
        else if(currentPlayer == 'o' && this.state.playerO == 'computer')
            return true;
        else
            return false;
    },

    nextMove: function(){
        if(this.isCurrentPlayerComputer())
            MovesApi.fetchBestMove(this.state.game)
                .then(this.handleMove);
    },

    render: function(){
        if(this.hasPlayers()) {
            return (
                <div>
                    <Board board={this.getBoard()} handleMove={this.handleMove}/>
                    <Banner status={this.getStatus()}/>
                </div>
            );
        }
        else {
            return (
                <Chooser chooseHumanPlayers={this.chooseHumanPlayers}/>
            );
        }
    }
});
