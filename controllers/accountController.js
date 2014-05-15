var Account = require('../models/account.js')

exports.list = function(req, res) {
  Account.find(function(err, accounts) {
    res.send(accounts);
  });
}
exports.listType = function(req, res) {
    var id_listType = req.params.listType;
    Account.find({ id_AccountType: id_listType},function(err, accounts) {
      res.send(accounts);
    });
}
exports.show = function(req, res){
    var id = req.params.id;
    Account.findById(id,function(err, account){
        res.send(account);
    });
}
exports.post = function(req, res) {
    var name = req.query.name;
    var balance = req.query.balance;
    var type = req.query.type;
    new Account({name: name, balance: balance, id_AccountType: type}).save(function(err,account){
        res.send(account);
    }); 
}
exports.edit = function(req, res) {
    var id = req.params.id;
    var name = req.query.name;
    var balance = req.query.balance;
    Account.findByIdAndUpdate(id,{name: name, balance: balance},function(err,account){
        res.send(account);
    }); 
}
exports.destroy = function(req, res){
    var id = req.params.id;
    Account.findById(id).remove(function(err, account){
        res.send();
    });
}
