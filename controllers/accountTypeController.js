var AccountType = require('../models/accountType.js')

exports.list = function(req, res) {
  AccountType.find(function(err, accountTypes) {
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
    new AccountType({name: name}).save(function(err,accountType){
        res.send(accountType);
    }); 
}
exports.edit = function(req, res) {
    var id = req.params.id;
    var name = req.query.name;
    AccountType.findByIdAndUpdate(id,{name: name},function(err,accountType){
        res.send(accountType);
    }); 
}
exports.destroy = function(req, res){
    var id = req.params.id;
    AccountType.findById(id).remove(function(err, accountType){
        res.send();
    });
}
