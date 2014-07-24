var express = require('express');

var mongoose = require('mongoose');
 
// connect to Mongo when the app initializes
//mongoose.connect('mongodb://root:root@ds030607.mongolab.com:30607/controleconomico');
mongoose.connect('mongodb://localhost/controleconomico', function(err) {
    if (err){
      console.log("Error al concectar con la base de datos.");
    }
});
var app = express();
app.use(express.bodyParser());

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

var account = require('./controllers/accountController.js');

app.get('/account', account.list);
app.get('/account/normal', account.listNormal);
app.get('/account/no_normal', account.listNoNormal);
app.get('/account/listType/:listType', account.listType);
app.get('/account/:id', account.show);
app.put('/account/:id', account.edit);
app.post('/account', account.post);
app.delete('/account/:id', account.destroy);

var accountType = require('./controllers/accountTypeController.js');

app.get('/accountType', accountType.list);
app.get('/accountType_all', accountType.listAll);
app.get('/accountType/:id', accountType.show);
app.post('/accountType', accountType.post);
app.put('/accountType/:id', accountType.edit);
app.delete('/accountType/:id', accountType.destroy);

var transactionType = require('./controllers/transactionTypeController.js');

app.get('/transactionType', transactionType.list);
app.get('/transactionType/automatic/account', transactionType.listAutomatic_Account);
app.get('/transactionType/listType/:listType', transactionType.listType);
app.get('/transactionType/:id', transactionType.show);
app.put('/transactionType/:id', transactionType.edit);
app.post('/transactionType', transactionType.post);
app.delete('/transactionType/:id', transactionType.destroy);

var transaction = require('./controllers/transactionController.js');

app.get('/transaction', transaction.list);
app.get('/transaction/listAccount/:listAccount', transaction.listAccount);
app.get('/transaction/listAccountCount/:listAccount', transaction.listAccountCount);
app.get('/transaction/:id', transaction.show);
app.put('/transaction/:id', transaction.edit);
app.post('/transaction', transaction.post);
app.delete('/transaction/:id', transaction.destroy);

var quotaPayment = require('./controllers/quotaPaymentController.js');

app.get('/quotaPayment', quotaPayment.listAll);
app.get('/quotaPayment/count', quotaPayment.listAllCount);
app.get('/quotaPayment/account/:account', quotaPayment.listAcount);
app.get('/quotaPayment/account/count/:account', quotaPayment.listAcountCount);
app.get('/quotaPayment/:id', quotaPayment.show);
app.post('/quotaPayment', quotaPayment.post);
app.put('/quotaPayment/:id', quotaPayment.edit);
app.delete('/quotaPayment/:id', quotaPayment.destroy);


var quota = require('./controllers/quotaController.js');

app.get('/quota/:quotaPayment', quota.listAll);
app.get('/quota/count/:quotaPayment', quota.listCount);
app.get('/quota/count/paid/:quotaPayment', quota.listCountPaid);
app.get('/quota/paid/:id', quota.show);
app.post('/quota/paid/:id', quota.post);
app.put('/quota/paid/:id', quota.edit);
app.delete('/quota/paid/:id', quota.destroy);


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
