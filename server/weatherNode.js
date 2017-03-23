var request = require('request');
var RateLimiter = require('limiter').RateLimiter;
var rateCount = 20;
var rateTime = 'minute';
var limiter = new RateLimiter(rateCount, rateTime);
var NodeCache = require('node-cache');
var cachedRequests = new NodeCache( { stdTTL: 3600, checkperiod: 100 }  );

var weatherNode = function (apikey, debug, rateCount, rateTime) {
    console.log('------------------------------------------');
    if (rateCount && rateTime) {
        limiter = new RateLimiter(rateCount, rateTime);
    }

    var that = this;
    var format = '.json';
    console.log('Client initialized, apikey: ' + apikey + ', debug enbaled: ' + debug +
    ', rateCount: ' + rateCount + ', rateTime: ' + rateTime);
    console.log('Cache Created: ');
    console.log(cachedRequests.getStats());

    var host = 'http://api.wunderground.com/api/' + apikey;
    var autocompleteURL = 'http://autocomplete.wunderground.com/aq?query=';
    console.log('Host: [' + host+ ']');
    console.log('AutocompleteURL: [' + autocompleteURL+ ']');
    console.log('------------------------------------------');

    var get = function (callback, params, query) {
        url = host + query;

        if(cachedRequests){
            var cachedResponse = cachedRequests.get(url);
            if(cachedResponse) {
              console.log('Found cached response.');
              if(debug) console.log('URL: [' + url + ']');
              if(debug) console.log('TTL: ['+ cachedRequests.getTtl( url) + ']');
              if(debug) console.log('Response: [' + cachedResponse + ']');
              callback('error', cachedResponse);
            }
            else{
              console.log('No cached response found.');

              // Throttle requests
              limiter.removeTokens(1, function (err, callbacks) {
                  // err will only be set if we request more than the maximum number of
                  // requests we set in the constructor
                  // remainingRequests tells us how many additional requests could be sent
                  // right this moment
                  console.log('Running limited request: [' + limiter.getTokensRemaining() + ']');
                  request(url, function (error, response, body) {
                      if (!error && response.statusCode == 200) {
                         // ...store the response in the cache (if caching is enabled)
                          if(cachedRequests) {
                            if(debug) console.log('URL: [' + url + ']');
                            if(debug) console.log('Response: [' + body+ ']');
                            console.log('Caching API response...');
                            cachedRequests.set(url, body);
                          }
                          callback(error, body);
                      }
                      else if (error) {
                          console.log('[' + url + '] Request failed!' + ', error: ' + err);
                      }
                  });
              });
            }
        }
    };


    var getAutocomplete = function (callback, params, url) {
      if(cachedRequests){
          var cachedResponse = cachedRequests.get(url);
          if(cachedResponse) {
            console.log('Found cached response.');
            if(debug) console.log('URL: [' + url + ']');
            if(debug) console.log('TTL: ['+ cachedRequests.getTtl( url) + ']');
            if(debug) console.log('Response: [' + cachedResponse + ']');
            callback('error', cachedResponse);
          }
          else{
            console.log('No cached response found.');
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   // ...store the response in the cache (if caching is enabled)
                    if(cachedRequests) {
                      if(debug) console.log('URL: [' + url + ']');
                      if(debug) console.log('Response: [' + body+ ']');
                      console.log('Caching API response...');
                      cachedRequests.set(url, body);
                    }
                    callback(error, body);
                }
                else if (error) {
                    console.log('[' + url + '] Request failed!' + ', error: ' + err);
                }
            });
          }
      }
    };

    that.forecast = function (query, callback) {
        get(callback, null, '/forecast/q/' + query + format);
    };

    that.forecast10day = function (query, callback) {
        get(callback, null, '/forecast10day/q/' + query + format);
    };

    that.autocomplete = function(query, callback){
      getAutocomplete(callback, null, autocompleteURL + query);
  	};
};

module.exports = weatherNode;
