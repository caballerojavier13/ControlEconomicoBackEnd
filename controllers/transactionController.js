var Transaction = require('../models/transaction.js');
var TransactionType = require('../models/transactionType.js');
var My_Date = require('../models/my_date.js');
var Account = require('../models/account.js');

exports.list = function(req, res) {
  Transaction.find()
  .populate('id_My_Date')
  .populate('id_Place')
  .populate('id_TransactionType')
  .exec(function(err, transactions) {
    res.send(transactions);
  });
}
exports.listAccount = function(req, res) {
    var id_Account = req.params.listAccount;
    Transaction.find({ id_Account: id_Account})
    .populate('id_My_Date')
    .populate('id_Place')
    .populate('id_TransactionType')
    .exec(function(err, transactions) {
      res.send(transactions);
    });
}
exports.show = function(req, res){
    var id = req.params.id;
    Transaction.findById(id)
    .populate('id_My_Date')
    .populate('id_Place')
    .populate('id_TransactionType')
    .exec(function(err, transaction){
        res.send(transaction);
    });
}
exports.post = function(req, res) {
    var id_Account = req.query.id_Account;
    var amount = req.query.amount;
    var concept = req.query.concept;
    var id_Place = req.query.id_Place;
    var id_TransactionType = req.query.id_TransactionType;
    var day = req.query.day;
    var month = req.query.month;
    var year = req.query.year;
    My_Date.findOne({day: day, month:month, year: year})
    .exec(function(err, my_date){
      if(my_date === null){
        new My_Date({day: day, month:month, year: year}).save(function(err,my_date){
          new Transaction({id_Account: id_Account,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: id_TransactionType}).save(function(err,transaction){
            Transaction.findById(transaction._id)
           .populate('id_My_Date')
           .populate('id_Place')
           .populate('id_TransactionType')
           .exec(function(err, transaction){
              TransactionType.findById(transaction.id_TransactionType,function(err,transactionType){
                Account.findById(transaction.id_Account,function(err,account){
                  account.balance = account.balance + (transactionType.sign * transaction.amount);
                  account.save(function(err,account){
                    res.send(transaction);
                  });
                  
                });
              });
            });
          });
        });
      }else{
        new Transaction({id_Account: id_Account,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: id_TransactionType}).save(function(err,transaction){
            Transaction.findById(transaction._id)
           .populate('id_My_Date')
           .populate('id_Place')
           .populate('id_TransactionType')
           .exec(function(err, transaction){
              TransactionType.findById(transaction.id_TransactionType,function(err,transactionType){
                Account.findById(transaction.id_Account,function(err,account){
                  account.balance = account.balance + (transactionType.sign * transaction.amount);
                  account.save(function(err,account){
                    res.send(transaction);
                  });
                  
                });
              });
            });
          });
      }
    });
    
}
exports.edit = function(req, res) {
    var id = req.params.id;
    var id_Account = req.query.id_Account;
    var amount = req.query.amount;
    var concept = req.query.concept;
    var id_Place = req.query.id_Place;
    var id_TransactionType = req.query.id_TransactionType;
    var day = req.query.day;
    var month = req.query.month;
    var year = req.query.year;
    Transaction.findById(id)
    .populate('id_TransactionType')
    .exec(function(err,oldTransaction){
      My_Date.findOne({day: day, month:month, year: year})
      .exec(function(err, my_date){
        if(my_date === null){
          new My_Date({day: day, month:month, year: year}).save(function(err,my_date){
            Transaction.findByIdAndUpdate(id,{id_Account: id_Account,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: id_TransactionType},function(err,transaction){
              Transaction.findById(transaction._id)
             .populate('id_My_Date')
             .populate('id_Place')
             .populate('id_TransactionType')
             .exec(function(err, transaction){
                TransactionType.findById(transaction.id_TransactionType,function(err,transactionType){
                  Account.findById(transaction.id_Account,function(err,account){
                    account.balance = account.balance + (transactionType.sign * transaction.amount) - (oldTransaction.id_TransactionType.sign * oldTransaction.amount);
                    account.save(function(err,account){
                      res.send(transaction);
                    });
                    
                  });
                });
              });
            });
          });
        }else{
          Transaction.findByIdAndUpdate(id,{id_Account: id_Account,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: id_TransactionType},function(err,transaction){
              Transaction.findById(transaction._id)
             .populate('id_My_Date')
             .populate('id_Place')
             .populate('id_TransactionType')
             .exec(function(err, transaction){
                TransactionType.findById(transaction.id_TransactionType,function(err,transactionType){
                  Account.findById(transaction.id_Account,function(err,account){
                    account.balance = account.balance + (transactionType.sign * transaction.amount) - (oldTransaction.id_TransactionType.sign * oldTransaction.amount);
                    account.save(function(err,account){
                      res.send(transaction);
                    });
                    
                  });
                });
              });
            });
        }
      });
    }); 
}
exports.destroy = function(req, res){
    var id = req.params.id;
    
    Transaction.findById(id).exec(function(err,transaction){
      TransactionType.findById(transaction.id_TransactionType,function(err,transactionType){
        Account.findById(transaction.id_Account,function(err,account){
          account.balance = account.balance - (transactionType.sign * transaction.amount);
          account.save(function(err,account){
            Transaction.findById(id).remove(function(err, transaction){
              res.send();
            });
          });
        });
      });
    });
    
}