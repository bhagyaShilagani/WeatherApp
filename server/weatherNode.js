var request = require('request');
var RateLimiter = require('limiter').RateLimiter;
var rateCount = 10;
var rateTime = 'minute';
var limiter = new RateLimiter(rateCount, rateTime);

var weatherNode = function (apikey, debug, rateCount, rateTime) {
    if (rateCount && rateTime) {
        console.log('reseting rate : ' + rateCount + ' per ' + rateTime);
        limiter = new RateLimiter(rateCount, rateTime);
    }
    var that = this;
    var format = ".json";
    console.log('Client initialized, apikey: ' + apikey + ', debug enbaled: ' + debug + ', rateCount: ' + rateCount + ', rateTime: ' + rateTime);

    var host = 'http://api.wunderground.com/api/' + apikey;

    console.log('Host: ' + host);

    var get = function (callback, params, path) {
        var url = host + path;
        if (debug) console.log('get: ' + url);

        // Throttle requests
        limiter.removeTokens(1, function (err, callbacks) {
            // err will only be set if we request more than the maximum number of
            // requests we set in the constructor

            // remainingRequests tells us how many additional requests could be sent
            // right this moment
            console.log('running limited request' + limiter.getTokensRemaining());
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (debug) console.log('response body: ' + body);
                    callback(error, body);
                }
                else if (error) {
                    console.log('error: ' + err);
                }

            });
        });
    };
    that.forecast = function (query, callback) {
        var path = "/forecast/q/" + query + format;
        get(callback, null, path);
    };

    that.forecast10day = function (query, callback) {
        var path = "/forecast10day/q/" + query + format;
        get(callback, null, path);
    };
};

module.exports = weatherNode;
