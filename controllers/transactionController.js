var Transaction = require('../models/transaction.js');
var TransactionType = require('../models/transactionType.js');
var My_Date = require('../models/my_date.js');
var Account = require('../models/account.js');

var query = require('array-query');

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
    var offset = req.query.offset;
    var limit = req.query.limit;
    Transaction.find({ id_Account: id_Account})
    
    .populate('id_My_Date')
    .populate('id_Place')
    .populate('id_TransactionType')
    .exec(function(err, transactions) {
       res.send(
         query()
        .sort()
        .custom(function(obj1, obj2) {
           return obj2.id_My_Date.year - obj1.id_My_Date.year;
         })
         .sort()
        .custom(function(obj1, obj2) {
           return obj2.id_My_Date.month - obj1.id_My_Date.month;
         })
         .sort()
        .custom(function(obj1, obj2) {
           return obj2.id_My_Date.day - obj1.id_My_Date.day;
         })
        .offset(offset)
        .limit(limit)
        .on(transactions));
    });
}
exports.listAccountCount = function(req, res) {
    var id_Account = req.params.listAccount;
    Transaction.find({ id_Account: id_Account})
    .count(function(err, transactions) {
      res.send({total: transactions});
    });
}
exports.show = function(req, res){
    var id = req.params.id;
    Transaction.findById(id)
    .populate('id_My_Date')
    .populate('id_Place')
    .populate('id_TransactionType')
    .populate('automaticTransaction')
    .exec(function(err, transaction){
       if(transaction.id_TransactionType.automaticTransaction){
         transaction.automaticTransaction.populate('id_Account', function (err) {
           res.send(transaction);
         });
       }else{
         res.send(transaction);
       } 
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
    var accountDO = req.query.accountDO;
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
                  account.balance1 = account.balance1 + (transactionType.sign * transaction.amount);
                  account.save(function(err,account){
                    if(accountDO === ""){
                      res.send(transaction);
                    }else{
                      Account.findById(accountDO,function(err, accountDO){
                        TransactionType.findOne({ 
                          id_AccountType: accountDO.id_AccountType,
                          automaticTransaction: true,
                          sign: ((-1) * transaction.id_TransactionType.sign)
                        }).exec(function(err, transactionTypeDO) {
                           new Transaction({id_Account: accountDO,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: transactionTypeDO._id}).save(function(err,transactionDO){
                             accountDO.balance1 = accountDO.balance1 - (transactionType.sign * transaction.amount);
                             accountDO.save(function(err,accountDO){
                               transactionDO.automaticTransaction = transaction._id;
                               transactionDO.save(function(err, transactionDO){
                                  transaction.automaticTransaction = transactionDO._id;
                                  transaction.save(function(err, transaction){
                                    res.send(transaction);
                                  });
                               });
                             });
                           });
                        });
                      });
                    }
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
                  account.balance1 = account.balance1 + (transactionType.sign * transaction.amount);
                  account.save(function(err,account){
                    if(accountDO === ""){
                      res.send(transaction);
                    }else{
                      Account.findById(accountDO,function(err, accountDO){
                        TransactionType.findOne({ 
                          id_AccountType: accountDO.id_AccountType,
                          automaticTransaction: true,
                          sign: ((-1) * transaction.id_TransactionType.sign)
                        }).exec(function(err, transactionTypeDO) {
                           new Transaction({id_Account: accountDO,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: transactionTypeDO._id}).save(function(err,transactionDO){
                             accountDO.balance1 = accountDO.balance1 - (transactionType.sign * transaction.amount);
                             accountDO.save(function(err,accountDO){
                               transactionDO.automaticTransaction = transaction._id;
                               transactionDO.save(function(err, transactionDO){
                                  transaction.automaticTransaction = transactionDO._id;
                                  transaction.save(function(err, transaction){
                                    res.send(transaction);
                                  });
                               });
                             });
                           });
                        });
                      });
                    }
                    
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
    var accountDO = req.query.accountDO;
    Transaction.findById(id)
    .populate('id_TransactionType')
    .populate('automaticTransaction')
    .exec(function(err,oldTransaction){
      My_Date.findOne({day: day, month:month, year: year})
      .exec(function(err, my_date){
        if(my_date === null){
          new My_Date({day: day, month:month, year: year}).save(function(err,my_date){
            if(oldTransaction.id_TransactionType.automaticTransaction){
              if(accountDO === ""){
              
                Account.findById(oldTransaction.automaticTransaction.id_Account,function(err,accountDO){
                 accountDO.balance1 = accountDO.balance1 - (oldTransaction.id_TransactionType.sign * transactionDO.amount);
                 accountDO.save(function(err,accountDO){
                    Transaction.findById(oldTransaction.automaticTransaction._id).remove(function(err, transactionDO){
                      Transaction.findByIdAndUpdate(id,{id_Account: id_Account,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: id_TransactionType, automaticTransaction: null},function(err,transaction){
                        Transaction.findById(transaction._id)
                        .populate('id_My_Date')
                        .populate('id_Place')
                        .populate('id_TransactionType')
                        .exec(function(err, transaction){
                          TransactionType.findById(transaction.id_TransactionType,function(err,transactionType){
                          Account.findById(transaction.id_Account,function(err,account){
                            account.balance1 = account.balance1 + (transactionType.sign * transaction.amount) - (oldTransaction.id_TransactionType.sign * oldTransaction.amount);
                            account.save(function(err,account){
                              res.send(transaction);
                            });
                          });
                         });
                       });
                      });
                    });
                  });
                });
                
              }else{
              
                Account.findById(oldTransaction.automaticTransaction.id_Account,function(err,old_accountDO){
                 old_accountDO.balance1 = old_accountDO.balance1 + (oldTransaction.id_TransactionType.sign * oldTransaction.amount);
                 old_accountDO.save(function(err,old_accountDO){
                   TransactionType.findById(id_TransactionType,function(err, newTransactionType){
                      Transaction.findById(oldTransaction.automaticTransaction._id).remove(function(err, transactionDO){
                        Account.findById(accountDO,function(err, accountDO){
                          TransactionType.findOne({ 
                            id_AccountType: accountDO.id_AccountType,
                            automaticTransaction: true,
                            sign: ((-1) * newTransactionType.sign)
                          }).exec(function(err, transactionTypeDO) {
                            new Transaction({id_Account: accountDO._id,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: transactionTypeDO._id}).save(function(err,transactionDO){
                              accountDO.balance1 = accountDO.balance1 + (transactionTypeDO.sign * transactionDO.amount);
                              accountDO.save(function(err,accountDO){
                                transactionDO.automaticTransaction = oldTransaction._id;
                                transactionDO.save(function(err, transactionDO){
                                  Transaction.findByIdAndUpdate(id,{id_Account: id_Account,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: id_TransactionType, automaticTransaction: transactionDO._id},function(err,transaction){
                                    Transaction.findById(transaction._id)
                                   .populate('id_My_Date')
                                   .populate('id_Place')
                                   .populate('id_TransactionType')
                                   .exec(function(err, transaction){
                                     TransactionType.findById(transaction.id_TransactionType,function(err,transactionType){
                                       Account.findById(transaction.id_Account,function(err,account){
                                         account.balance1 = account.balance1 + (transactionType.sign * transaction.amount) - (oldTransaction.id_TransactionType.sign * oldTransaction.amount);
                                         account.save(function(err,account){
                                           res.send(transaction);
                                         });
                                       });
                                     });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              }
              
            }else{
              if(accountDO === ""){
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
              }else{
                TransactionType.findById(id_TransactionType,function(err, newTransactionType){
                  Account.findById(accountDO,function(err, accountDO){
                    TransactionType.findOne({ 
                      id_AccountType: accountDO.id_AccountType,
                      automaticTransaction: true,
                      sign: ((-1) * oldTransaction.id_TransactionType.sign)
                    }).exec(function(err, transactionTypeDO) {
                      new Transaction({id_Account: accountDO._id,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: transactionTypeDO._id}).save(function(err,transactionDO){
                        accountDO.balance1 = accountDO.balance1 + (transactionTypeDO.sign * transactionDO.amount);
                        accountDO.save(function(err,accountDO){
                          transactionDO.automaticTransaction = oldTransaction._id;
                          transactionDO.save(function(err, transactionDO){
                            Transaction.findByIdAndUpdate(id,{id_Account: id_Account,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: id_TransactionType, automaticTransaction: transactionDO._id},function(err,transaction){
                              Transaction.findById(transaction._id)
                             .populate('id_My_Date')
                             .populate('id_Place')
                             .populate('id_TransactionType')
                             .exec(function(err, transaction){
                               TransactionType.findById(transaction.id_TransactionType,function(err,transactionType){
                                 Account.findById(transaction.id_Account,function(err,account){
                                   account.balance1 = account.balance1 + (transactionType.sign * transaction.amount) - (oldTransaction.id_TransactionType.sign * oldTransaction.amount);
                                   account.save(function(err,account){
                                     res.send(transaction);
                                   });
                                 });
                               });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              }
            }
          });
        }else{
          if(oldTransaction.id_TransactionType.automaticTransaction){
            if(accountDO === ""){
            
              Account.findById(oldTransaction.automaticTransaction.id_Account,function(err,accountDO){
               accountDO.balance1 = accountDO.balance1 - (oldTransaction.id_TransactionType.sign * transactionDO.amount);
               accountDO.save(function(err,accountDO){
                  Transaction.findById(oldTransaction.automaticTransaction._id).remove(function(err, transactionDO){
                    Transaction.findByIdAndUpdate(id,{id_Account: id_Account,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: id_TransactionType, automaticTransaction: null},function(err,transaction){
                      Transaction.findById(transaction._id)
                      .populate('id_My_Date')
                      .populate('id_Place')
                      .populate('id_TransactionType')
                      .exec(function(err, transaction){
                        TransactionType.findById(transaction.id_TransactionType,function(err,transactionType){
                        Account.findById(transaction.id_Account,function(err,account){
                          account.balance1 = account.balance1 + (transactionType.sign * transaction.amount) - (oldTransaction.id_TransactionType.sign * oldTransaction.amount);
                          account.save(function(err,account){
                            res.send(transaction);
                          });
                        });
                       });
                     });
                    });
                  });
                });
              });
              
            }else{
            
              Account.findById(oldTransaction.automaticTransaction.id_Account,function(err,old_accountDO){
               old_accountDO.balance1 = old_accountDO.balance1 + (oldTransaction.id_TransactionType.sign * oldTransaction.amount);
               old_accountDO.save(function(err,old_accountDO){
                  TransactionType.findById(id_TransactionType,function(err, newTransactionType){
                    Transaction.findById(oldTransaction.automaticTransaction._id).remove(function(err, transactionDO){
                      Account.findById(accountDO,function(err, accountDO){
                        TransactionType.findOne({ 
                          id_AccountType: accountDO.id_AccountType,
                          automaticTransaction: true,
                          sign: ((-1) * newTransactionType.sign)
                        }).exec(function(err, transactionTypeDO) {
                          new Transaction({id_Account: accountDO._id,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: transactionTypeDO._id}).save(function(err,transactionDO){
                            accountDO.balance1 = accountDO.balance1 + (transactionTypeDO.sign * transactionDO.amount);
                            accountDO.save(function(err,accountDO){
                              transactionDO.automaticTransaction = oldTransaction._id;
                              transactionDO.save(function(err, transactionDO){
                                Transaction.findByIdAndUpdate(id,{id_Account: id_Account,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: id_TransactionType, automaticTransaction: transactionDO._id},function(err,transaction){
                                  Transaction.findById(transaction._id)
                                 .populate('id_My_Date')
                                 .populate('id_Place')
                                 .populate('id_TransactionType')
                                 .exec(function(err, transaction){
                                   TransactionType.findById(transaction.id_TransactionType,function(err,transactionType){
                                     Account.findById(transaction.id_Account,function(err,account){
                                       account.balance1 = account.balance1 + (transactionType.sign * transaction.amount) - (oldTransaction.id_TransactionType.sign * oldTransaction.amount);
                                       account.save(function(err,account){
                                         res.send(transaction);
                                       });
                                     });
                                   });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            }
            
          }else{
            if(accountDO === ""){
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
            }else{
              TransactionType.findById(id_TransactionType,function(err, newTransactionType){
                Account.findById(accountDO,function(err, accountDO){
                  TransactionType.findOne({ 
                    id_AccountType: accountDO.id_AccountType,
                    automaticTransaction: true,
                    sign: ((-1) * oldTransaction.id_TransactionType.sign)
                  }).exec(function(err, transactionTypeDO) {
                    new Transaction({id_Account: accountDO._id,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: transactionTypeDO._id}).save(function(err,transactionDO){
                      accountDO.balance1 = accountDO.balance1 + (transactionTypeDO.sign * transactionDO.amount);
                      accountDO.save(function(err,accountDO){
                        transactionDO.automaticTransaction = oldTransaction._id;
                        transactionDO.save(function(err, transactionDO){
                          Transaction.findByIdAndUpdate(id,{id_Account: id_Account,id_My_Date:my_date._id,amount: amount, concept: concept, id_Place: id_Place, id_TransactionType: id_TransactionType, automaticTransaction: transactionDO._id},function(err,transaction){
                            Transaction.findById(transaction._id)
                           .populate('id_My_Date')
                           .populate('id_Place')
                           .populate('id_TransactionType')
                           .exec(function(err, transaction){
                             TransactionType.findById(transaction.id_TransactionType,function(err,transactionType){
                               Account.findById(transaction.id_Account,function(err,account){
                                 account.balance1 = account.balance1 + (transactionType.sign * transaction.amount) - (oldTransaction.id_TransactionType.sign * oldTransaction.amount);
                                 account.save(function(err,account){
                                   res.send(transaction);
                                 });
                               });
                             });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            }
          }
        }
      });
    }); 
}
exports.destroy = function(req, res){
    var id = req.params.id;
    
    Transaction.findById(id).exec(function(err,transaction){
      TransactionType.findById(transaction.id_TransactionType,function(err,transactionType){
        if(transactionType.automaticTransaction){
          Transaction.findById(transaction.automaticTransaction).exec(function(err,transactionDO){
            Account.findById(transactionDO.id_Account,function(err,accountDO){
              accountDO.balance1 = accountDO.balance1 + (transactionType.sign * transactionDO.amount);
              accountDO.save(function(err,accountDO){
                Transaction.findById(transactionDO._id).remove(function(err, transactionDO){
                  Account.findById(transaction.id_Account,function(err,account){
                    account.balance1 = account.balance1 - (transactionType.sign * transaction.amount);
                    account.save(function(err,account){
                      Transaction.findById(id).remove(function(err, transaction){
                        res.send();
                      });
                    });
                  });
                });
              });
            });
          });
        }else{
          Account.findById(transaction.id_Account,function(err,account){
            account.balance1 = account.balance1 - (transactionType.sign * transaction.amount);
            account.save(function(err,account){
              Transaction.findById(id).remove(function(err, transaction){
                res.send();
              });
            });
          });
        }
      });
    });
    
}