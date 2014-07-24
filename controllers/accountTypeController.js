var AccountType = require('../models/accountType.js')
var Account = require('../models/account.js')

exports.list = function(req, res) {
  AccountType.find({normalOperation: true})
  .sort({name: 1})
  .exec(function(err, accountTypes) {
    res.send(accountTypes);
  });
}
exports.listAll = function(req, res) {
  AccountType.find()
  .sort({name: 1})
  .exec(function(err, accountTypes) {
    res.send(accountTypes);
  });
}
exports.show = function(req, res){
    var id = req.params.id;
    AccountType.findById(id,function(err, accountType){
        res.send(accountType);
    });
}
exports.post = function(req, res) {
    var name = req.query.name;
    var nameBalance1 = req.query.nameBalance1;
    var nameBalance2 = req.query.nameBalance2;
    var allowBalance2 = req.query.allowBalance2;
    var normalOperation = req.query.normalOperation;
    
    new AccountType({name: name,nameBalance1: nameBalance1, nameBalance2: nameBalance2, allowBalance2: allowBalance2, normalOperation: normalOperation}).save(function(err,accountType){
        res.send(accountType);
    }); 
}
exports.edit = function(req, res) {
    var id = req.params.id;
    var name = req.query.name;
    var nameBalance1 = req.query.nameBalance1;
    var nameBalance2 = req.query.nameBalance2;
    var allowBalance2 = req.query.allowBalance2;
    var normalOperation = req.query.normalOperation;
    AccountType.findByIdAndUpdate(id,{name: name,nameBalance1: nameBalance1, nameBalance2: nameBalance2, allowBalance2: allowBalance2, normalOperation: normalOperation},function(err,accountType){
        res.send(accountType);
    }); 
}
exports.destroy = function(req, res){
    var id = req.params.id;
    Account.find({ id_AccountType: id},function(err, accounts) {	
      if(accounts.length < 1){
      	AccountType.findById(id).remove(function(err, accountType){
          res.send();
        });
      }else{
        res.send(500);
      }
    });
    
    
}
