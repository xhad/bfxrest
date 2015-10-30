var request = require('request');
var MongoClient = require('mongodb').MongoClient;

//var ObjectId = require('mongodb').ObjectID;

var dbUrl = 'mongodb://127.0.0.1:27017/bfx';

// bitfinex rest api get latest trade for USD

var apiUrl = "https://api.bitfinex.com/v1";

var payload = {
   "timestamp": false,
   "limit_trades": 1
};

var tradesurl = {
   url: apiUrl + '/trades/BTCUSD',
   qs: payload
};

var lendbookUSDurl = {
   url: apiUrl + '/lendbook/usd',
   qs: payload
};

var lendbookBTCurl = {
   url: apiUrl + '/lendbook/btc',
   qs: payload
};

var lendsUSDurl = {
   url: apiUrl + '/lends/USD',
   qs: payload
};

var lendsBTCurl = {
   url: apiUrl + '/lends/BTC',
   qs: payload
};



function get() {


   //get lastest trade and insert into mongo
   MongoClient.connect(dbUrl, function(err, db) {


      request.get(tradesurl, function(error, response, tradedata) {

         tradedata = JSON.parse(tradedata);
         console.log(tradedata[0]['timestamp'] + ": " + tradedata[0]['amount'] + " @ " + tradedata[0]['price']);


         db.collection('trades').insert({
            timestamp: tradedata[0]['timestamp'],
            price: tradedata[0]['price'],
            amount: tradedata[0]['amount'],
            type: tradedata[0]['type']
         }, function(error, result) {
            if (error) console.log(error); //info about what went wrong
            if (result) console.log(result, db.close()); //the _id of new object if successful


         });


      })
   });
   // get latest lendbook USD data and insert into mongo
   MongoClient.connect(dbUrl, function(err, db) {

      request.get(lendbookUSDurl, function(error, response, lendbookUSDdata) {

         lbUSDdata = JSON.parse(lendbookUSDdata);
         console.log('lendbook in USD :' + lbUSDdata['bids'][0]['timestamp'] + ": " + lbUSDdata['bids'][0]['amount'] + " @ " + lbUSDdata['bids'][0]['rate'] + ' for ' + lbUSDdata['bids'][0]['period']);


         db.collection('lendbookUSD').insert({
            timestamp: lbUSDdata['bids'][0]['timestamp'],
            rate: lbUSDdata['bids'][0]['rate'],
            amount: lbUSDdata['bids'][0]['amount'],
            period: lbUSDdata['bids'][0]['period'],
            ffr: lbUSDdata['bids'][0]['frr'],
         }, function(error, result) {
            if (error) console.log(error); //info about what went wrong
            if (result) console.log(result, db.close()); //the _id of new object if successful


         });


      })
   });
   // get latest lendbook in BTC data and insert into mongo
   MongoClient.connect(dbUrl, function(err, db) {

      request.get(lendbookBTCurl, function(error, response, lendbookBTCdata) {

         lbBTCdata = JSON.parse(lendbookBTCdata);
         console.log('lendbook in BTC :' + lbBTCdata['bids'][0]['timestamp'] + ": " + lbBTCdata['bids'][0]['amount'] + " @ " + lbBTCdata['bids'][0]['rate'] + ' for ' + lbBTCdata['bids'][0]['period']);


         db.collection('lendbookBTC').insert({
            timestamp: lbBTCdata['bids'][0]['timestamp'],
            rate: lbBTCdata['bids'][0]['rate'],
            amount: lbBTCdata['bids'][0]['amount'],
            period: lbBTCdata['bids'][0]['period'],
            ffr: lbBTCdata['bids'][0]['frr'],
         }, function(error, result) {
            if (error) console.log(error); //info about what went wrong
            if (result) console.log(result, db.close()); //the _id of new object if successful
         });
      })
   });
   // get latest lends in USD data and insert into mongo
   MongoClient.connect(dbUrl, function(err, db) {

      request.get(lendsUSDurl, function(error, response, lendsUSDdata) {

         ldsUSDdata = JSON.parse(lendsUSDdata);
         console.log('lends in USD :' + ldsUSDdata[0]['timestamp'] + ": " + ldsUSDdata[0]['rate'] + " @ " + ldsUSDdata[0]['amount_lent'] + ' for ' + ldsUSDdata[0]['amount_used']);


         db.collection('lendsUSD').insert({
            timestamp: ldsUSDdata[0]['timestamp'],
            rate: ldsUSDdata[0]['rate'],
            amount: ldsUSDdata[0]['amount_lent'],
            period: ldsUSDdata[0]['amount_used']  
         }, function(error, result) {
            if (error) console.log(error); //info about what went wrong
            if (result) console.log(result, db.close()); //the _id of new object if successful
         });
      })
   });
   // get latest lends in USD data and insert into mongo
   MongoClient.connect(dbUrl, function(err, db) {

      request.get(lendsBTCurl, function(error, response, lendsBTCdata) {

         ldsBTCdata = JSON.parse(lendsBTCdata);
         console.log('lends in BTC :' + ldsBTCdata[0]['timestamp'] + ": " + ldsBTCdata[0]['rate'] + " @ " + ldsBTCdata[0]['amount_lent'] + ' for ' + ldsBTCdata[0]['amount_used']);


         db.collection('lendsBTC').insert({
            timestamp: ldsBTCdata[0]['timestamp'],
            rate: ldsBTCdata[0]['rate'],
            amount: ldsBTCdata[0]['amount_lent'],
            period: ldsBTCdata[0]['amount_used']  
         }, function(error, result) {
            if (error) console.log(error); //info about what went wrong
            if (result) console.log(result, db.close()); //the _id of new object if successful
         });
      })
   });


};

get();
