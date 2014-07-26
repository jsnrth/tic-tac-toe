"use strict";

var React = require('react');

module.exports = React.createClass({
    statusText: function(){
        if(this.props.status.done){
            if(this.props.status.winner)
                return "Winner! " + this.props.status.winner.toUpperCase();
            else
                return "Tie!"
        }
        else
            return "Next: " + this.props.status.player.toUpperCase();
    },

    render: function(){
        return (
            <div>
                {this.statusText()}
            </div>
        );
    }
});
