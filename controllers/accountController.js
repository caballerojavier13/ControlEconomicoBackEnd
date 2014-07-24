var Account = require('../models/account.js')
var Transaction = require('../models/transaction.js');

var query = require('array-query');

exports.list = function(req, res) {
  Account.find()
  .sort({name: 1})
  .exec(function(err, accounts) {
    res.send(accounts);
  });
}
exports.listNormal = function(req, res) {
  Account.find()
  .populate('id_AccountType')
  .sort({name: 1})
  .exec(function(err, accounts) {
      res.send(query("id_AccountType.normalOperation").is(true).on(accounts));
  });
}
exports.listNoNormal = function(req, res) {
  Account.find()
  .populate('id_AccountType')
  .sort({name: 1})
  .exec(function(err, accounts) {
    res.send(query("id_AccountType.normalOperation").is(false).on(accounts));
  });
}
exports.listType = function(req, res) {
    var id_listType = req.params.listType;
    Account.find({ id_AccountType: id_listType})
    .sort({name: 1})
    .exec(function(err, accounts) {
      res.send(accounts);
    });
}
exports.show = function(req, res){
    var id = req.params.id;
    Account.findById(id)
   
	.exec(function(err, account){
        res.send(account);
    });
}
exports.post = function(req, res) {
    var name = req.query.name;
    var balance1 = req.query.balance1;
    var balance2 = req.query.balance2;
    var type = req.query.type;
    new Account({name: name, balance1: balance1, balance2: balance2, id_AccountType: type}).save(function(err,account){
        res.send(account);
    }); 
}
exports.edit = function(req, res) {
    var id = req.params.id;
    var name = req.query.name;
    var balance1 = req.query.balance1;
    var balance2 = req.query.balance2;
    Account.findByIdAndUpdate(id,{name: name, balance1: balance1, balance2: balance2},function(err,account){
        res.send(account);
    }); 
}
exports.destroy = function(req, res){
    var id = req.params.id;
    Transaction.find({ id_Account: id},function(err, transactions){
      if(transactions.length < 1){
      	Account.findById(id).remove(function(err, account){
	  res.send();
    	});
      }else{
        res.send(500);
      }
    });
    
}
