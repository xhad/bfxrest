var request = require('request');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//var ObjectId = require('mongodb').ObjectID;

var dbUrl = 'mongodb://localhost:27017/btcusd';

// bitfinex rest api get latest trade for USD

var apiUrl = "https://api.bitfinex.com/v1";

var payload = {
   "timestamp": false,
   "limit_trades": 1
};

var options = {
   url: apiUrl + '/trades/BTCUSD',
   qs: payload
};

function get() {

   MongoClient.connect(dbUrl, function(err, db) {


            request.get(options, function(error, response, data) {

               data = JSON.parse(data);
               console.log(data[0]['timestamp'] + ": " + data[0]['amount'] + " @ " + data[0]['price']);


               db.collection('bfx').insert({
                  timestamp: data[0]['timestamp'],
                  price: data[0]['price'],
                  amount: data[0]['amount'],
                  type: data[0]['type']
               });

               db.close();
               return;
            })

   });
};

get();
