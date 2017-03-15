var config = require('./config/properties');
var weatherNodeRouter = require("./weatherNode");
var URL = require('url');
var debug = false;
var client = new weatherNodeRouter(config.apiKey, debug,  10, 'minute');
var express = require('express');

var app = express();

app.get('/', function(req, res) {
      res.end('Hello!! This is a Weather App made by Bhagya!');
});


app.get('/forecast', function(req, res){
    var query = URL.parse(req.url).query;
    console.log("Forecast request received for zipcode: " + query);
    client.forecast(query, function(err, obj) {
        res.end(obj);
    });
});

app.get('/forecast10day', function(req, res) {
   var query = URL.parse(req.url).query;
   if (debug) console.log("10 Day Forecast request received for zipcode: " + query);
   client.forecast10day(query, function(err, obj) {
         res.end(obj);
    });
});

//app.listen(3010);

module.exports = app;
