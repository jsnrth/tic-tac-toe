"use strict";

var React = require('react');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            playerX: false,
            playerO: false
        }
    },

    playerHandler: function(e){
        var name = e.target.name;
        var value = e.target.checked;
        var update = {};
        update[name] = value;
        this.setState(update);
    },

    beginHandler: function(e){
        this.props.chooseHumanPlayers({
            playerX: this.state.playerX,
            playerO: this.state.playerO
        });
    },

    render: function(){
        return (
            <div>
                <p>Which players are human?</p>
                <ul>
                    <li>
                        <label>
                            <input onChange={this.playerHandler} name="playerX" type="checkbox"/> Player X
                        </label>
                    </li>
                    <li>
                        <label>
                            <input onChange={this.playerHandler} name="playerO" type="checkbox"/> Player O
                        </label>
                    </li>
                </ul>
                <button onClick={this.beginHandler}>Begin!</button>
            </div>
        );
    }
});
