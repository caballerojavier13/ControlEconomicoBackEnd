var TransactionType  = require('../models/transactionType.js');
var Transaction = require('../models/transaction.js');
var Account = require('../models/account.js')


//listAutomatic_Account

exports.list = function(req, res) {
  TransactionType.find()
  .populate('id_AccountType')
  .sort({name: 1})
  .exec(function(err, transactionTypes) {
    res.send(transactionTypes);
  });
}
exports.listType = function(req, res) {
    var id_listType = req.params.listType;
    TransactionType.find({ id_AccountType: id_listType})
    .populate('id_AccountType')
    .exec(function(err, transactionTypes) {	
       res.send(transactionTypes);
    });
}

exports.listAutomatic_Account = function(req, res) {
  var no_account = req.query.no_account;
  TransactionType.find({
    automaticTransaction: true
  })
  .distinct("id_AccountType")
  .exec(function(err, transactionTypes) {
    Account.find( { id_AccountType: { $in: transactionTypes } , _id: { $ne: no_account }  }, {name: 1} )
    .exec(function(err, accounts){ 
       res.send(accounts); 
    });
  });
}

exports.show = function(req, res){
    var id = req.params.id;
    TransactionType.findById(id)
    .populate('id_AccountType')
    .exec(function(err, transactionType){
        res.send(transactionType);
    });
}
exports.post = function(req, res) {
    var name = req.query.name;
    var sign = req.query.sign;
    var allowPlace = req.query.allowPlace;
    var allowConcept = req.query.allowConcept;
    var id_AccountType = req.query.id_AccountType;
    var automaticTransaction = req.query.automaticTransaction;
    new TransactionType({name: name, sign: sign, allowPlace: allowPlace, allowConcept: allowConcept,automaticTransaction: automaticTransaction, id_AccountType: id_AccountType}).save(function(err,transactionType){
        TransactionType.findById(transactionType._id)
        .populate('id_AccountType')
        .exec(function(err, transactionType){
           res.send(transactionType);
        });
    }); 
}
exports.edit = function(req, res) {
    var id = req.params.id;
    var name = req.query.name;
    var sign = req.query.sign;
    var allowPlace = req.query.allowPlace;
    var allowConcept = req.query.allowConcept;
    var automaticTransaction = req.query.automaticTransaction;
    var id_AccountType = req.query.id_AccountType;
    TransactionType.findByIdAndUpdate(id,{name: name, sign: sign, allowPlace: allowPlace,automaticTransaction: automaticTransaction, allowConcept: allowConcept, id_AccountType: id_AccountType})
    .populate('id_AccountType')
    .exec(function(err,transactionType){
        res.send(transactionType);
    }); 
}
exports.destroy = function(req, res){
    var id = req.params.id;
    Transaction.find({ id_TransactionType: id},function(err, transactions){
      if(transactions.length < 1){
      	TransactionType.findById(id).remove(function(err, transactionType){
           res.send();
        });
      }else{
        res.send(500);
      }
    });
}