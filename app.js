var express = require('express');

var App = function() {
  var app = express();

  app.get('/', function(req, res){
    res.send('hello world');
  });

  return app;
};

module.exports = App;
