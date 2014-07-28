"use strict";

var express = require('express');
var bodyParser = require('body-parser')
var Player = require('./computer-player');

var app = express();

app.use(express.static('./dist'));
app.use(bodyParser.json());

app.post('/api/best-move', function(req, res){
    var game = req.body;
    Player.getMove(game).then(function(bestMove){
        res.json({bestMove: bestMove});
    });
});

module.exports = app;
