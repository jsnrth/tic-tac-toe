/* global React */

module.exports = React.createClass({
    render: function(){
        return (
            <div id="board">
                <div className="row">
                    <div className="cell" data-position="0">Hi!</div>
                    <div className="cell" data-position="1">Hi!</div>
                    <div className="cell" data-position="2">Hi!</div>
                </div>
                <div className="row">
                    <div className="cell" data-position="3">Hi!</div>
                    <div className="cell" data-position="4">Hi!</div>
                    <div className="cell" data-position="5">Hi!</div>
                </div>
                <div className="row">
                    <div className="cell" data-position="6">Hi!</div>
                    <div className="cell" data-position="7">Hi!</div>
                    <div className="cell" data-position="8">Hi!</div>
                </div>
            </div>
        );
    }
});
