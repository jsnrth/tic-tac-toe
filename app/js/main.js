/* global React */
var Board = require('./board');

var gameNode = document.getElementById('game');
React.renderComponent(Board(), gameNode);
