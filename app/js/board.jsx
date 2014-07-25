var React = require('react');

module.exports = React.createClass({
    displayName: 'Board',

    getBoard: function(){
        return this.props.board;
    },

    getBoardPosition: function(index){
        return this.getBoard()[index];
    },

    moveHandler: function(position){
        var handleMove = this.props.handleMove;
        return function(e){
            return handleMove(position);
        }
    },

    render: function(){
        return (
            <div id="board">
                <div className="row">
                    <a className="cell" onClick={this.moveHandler(0)}>{this.getBoardPosition(0)}</a>
                    <a className="cell" onClick={this.moveHandler(1)}>{this.getBoardPosition(1)}</a>
                    <a className="cell" onClick={this.moveHandler(2)}>{this.getBoardPosition(2)}</a>
                </div>
                <div className="row">
                    <a className="cell" onClick={this.moveHandler(3)}>{this.getBoardPosition(3)}</a>
                    <a className="cell" onClick={this.moveHandler(4)}>{this.getBoardPosition(4)}</a>
                    <a className="cell" onClick={this.moveHandler(5)}>{this.getBoardPosition(5)}</a>
                </div>
                <div className="row">
                    <a className="cell" onClick={this.moveHandler(6)}>{this.getBoardPosition(6)}</a>
                    <a className="cell" onClick={this.moveHandler(7)}>{this.getBoardPosition(7)}</a>
                    <a className="cell" onClick={this.moveHandler(8)}>{this.getBoardPosition(8)}</a>
                </div>
            </div>
        );
    }
});
