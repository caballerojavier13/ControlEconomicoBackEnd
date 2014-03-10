var express = require('express');

var mongoose = require('mongoose');
 
// connect to Mongo when the app initializes
//mongoose.connect('mongodb://root:root@ds030607.mongolab.com:30607/controleconomico');
mongoose.connect('mongodb://localhost/controleconomico');

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

app.get('/place', place.list);
app.get('/place/:id', place.show);
app.put('/place/:id', place.edit);
app.post('/place', place.post);
app.delete('/place/:id', place.destroy);

var DMT = require('./controllers/debitMovementTypeController.js');

app.get('/debitmovementtype', DMT.list);
app.get('/debitmovementtype/:id', DMT.show);
app.put('/debitmovementtype/:id', DMT.edit);
app.post('/debitmovementtype', DMT.post);
app.delete('/debitmovementtype/:id', DMT.destroy);

var dCard = require('./controllers/debitCardController.js');

app.get('/debitcard', dCard.list);
app.get('/debitcard/:id', dCard.show);
app.get('/debitcard/:id/movements', dCard.movements);
app.put('/debitcard/:id', dCard.edit);
app.post('/debitcard', dCard.post);
app.delete('/debitcard/:id', dCard.destroy);

var cCard = require('./controllers/creditCardController.js');

app.get('/creditcard', cCard.list);
app.get('/creditcard/:id', cCard.show);
app.put('/creditcard/:id', cCard.edit);
app.post('/creditcard', cCard.post);
app.delete('/creditcard/:id', cCard.destroy);

var dMovement = require('./controllers/debitMovementController.js');

app.get('/debitmovement', dMovement.list);
app.get('/debitmovement/:id', dMovement.show);
app.put('/debitmovement/:id', dMovement.edit);
app.post('/debitmovement', dMovement.post);
app.delete('/debitmovement/:id', dMovement.destroy);

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

