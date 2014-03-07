var express = require('express');

var mongoose = require('mongoose');
 
// connect to Mongo when the app initializes
mongoose.connect('mongodb://root:root@ds030607.mongolab.com:30607/controleconomico');

var app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.get('/', function(request, response) {
    response.send({mensaje: 'Hello World!'});
});

var place = require('./controllers/placeController.js');

app.post('/place', place.post);
app.get('/place', place.list);

app.use(function(req, res, next){
  res.status(404);
  res.send({ error: '404' });
});
app.use(function(req, res, next){
  res.status(500);
  res.send({ error: '500' });
});


app.listen(3000);
console.log("Express server listening on port 3000");