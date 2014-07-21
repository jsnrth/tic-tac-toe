var React = require('../../bower_components/react/react.min');
var Board = require('./board');

var gameNode = document.getElementById('game');
React.renderComponent(Board(), gameNode);
