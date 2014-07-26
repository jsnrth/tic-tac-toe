"use strict";

var request = require('browser-request');
var Q = require('q');

module.exports.fetchBestMove = function(game){
    var deferred = Q.defer();
    request.post({
        uri: '/api/best-move',
        body: JSON.stringify(game),
        json: true},
        requestHandler(deferred));
    return deferred.promise;
}


function requestHandler(deferred){
    return function(err, response, data){
        if(err)
            deferred.reject(err);
        else
            deferred.resolve(data.bestMove);
    }
}
