var QuotaPayment = require('../models/quotaPayment.js');
var Quota = require('../models/quota.js');
var My_Date = require('../models/my_date.js');
var Account = require('../models/account.js');
var Transaction = require('../models/transaction.js');
var TransactionType = require('../models/transactionType.js');

var query = require('array-query');

exports.listAll = function(req, res) {
    var quotaPayment = req.params.quotaPayment;
    Quota.find({QuotaPayment: quotaPayment})
            .sort({number: 1})
            .exec(function(err, quotas) {
                res.send(quotas);
            });
}
exports.listCount = function(req, res) {
    var quotaPayment = req.params.quotaPayment;
    Quota.find({QuotaPayment: quotaPayment})
            .count(function(err, quotas) {
                res.send({total: quotas});
            });
}
exports.listCountPaid = function(req, res) {
    var quotaPayment = req.params.quotaPayment;
    Quota.find({QuotaPayment: quotaPayment, paid: true})
            .count(function(err, quotas) {
                res.send({total: quotas});
            });
}
exports.show = function(req, res) {
    var id = req.params.id;
    Quota.findById(id)
            .populate('Transaction')
            .exec(function(err, quota) {
                quota.Transaction.populate('id_Account', function(err) {
                    quota.Transaction.populate('id_My_Date', function(err) {
                        res.send(quota);
                    });
                });
            });
}
exports.post = function(req, res) {
    var id = req.params.id;

    var amount = req.body.amount;
    var account = req.body.Account;

    var day = req.body.day;
    var month = req.body.month;
    var year = req.body.year;

    Quota.findById(id)
    .populate('Transaction')
    .populate('QuotaPayment')
    .exec(function(err, quota) {
		name = "Pago Cuota Nº " + quota.number + " - " + quota.QuotaPayment.concept;
		My_Date.findOne({day: day, month: month, year: year})
		        .exec(function(err, my_date) {

		            if (my_date === null) {
		                new My_Date({day: day, month: month, year: year}).save(function(err, my_date) {
		                    Account.findById(account, function(err, obj_account) {
		                        TransactionType.find({id_AccountType: obj_account.id_AccountType, name: 'Pago Cuota Crédito'}, function(err, transactionType) {
		                            if (transactionType.length < 1) {
		                                new TransactionType({id_AccountType: obj_account.id_AccountType, name: 'Pago Cuota Crédito', sign: -1, allowPlace: false, allowConcept: true, automaticTransaction: false, }).save(function(err, transactionType) {
		                                    new Transaction({id_Account: account, id_My_Date: my_date._id, amount: amount, concept: name, id_TransactionType: transactionType._id}).save(function(err, transaction) {
		                                        quota.paid = true;
		                                        quota.Transaction = transaction._id;
		                                        quota.save(function(err, quota) {
		                                            obj_account.balance1 = obj_account.balance1 - amount;
		                                            obj_account.save(function(err, account) {
		                                                res.send(200);
		                                            });
		                                        });
		                                    });
		                                });
		                            } else {
		                                new Transaction({id_Account: account, id_My_Date: my_date._id, amount: amount, concept: name, id_TransactionType: transactionType[0]._id}).save(function(err, transaction) {
		                                    quota.paid = true;
		                                    quota.Transaction = transaction._id;
		                                    quota.save(function(err, quota) {
		                                        obj_account.balance1 = obj_account.balance1 - amount;
		                                        obj_account.save(function(err, account) {
		                                            res.send(200);
		                                        });
		                                    });
		                                });
		                            }
		                        });
		                    });

		                });
		            } else {
		                Account.findById(account, function(err, obj_account) {
		                    TransactionType.find({id_AccountType: obj_account.id_AccountType, name: 'Pago Cuota Crédito'}, function(err, transactionType) {
		                        if (transactionType.length < 1) {
		                            new TransactionType({id_AccountType: obj_account.id_AccountType, name: 'Pago Cuota Crédito', sign: -1, allowPlace: false, allowConcept: true, automaticTransaction: false, }).save(function(err, transactionType) {
		                                new Transaction({id_Account: account, id_My_Date: my_date._id, amount: amount, concept: name, id_TransactionType: transactionType._id}).save(function(err, transaction) {
		                                    quota.paid = true;
		                                    quota.Transaction = transaction._id;
		                                    quota.save(function(err, quota) {
		                                        obj_account.balance1 = obj_account.balance1 - amount;
		                                        obj_account.save(function(err, account) {
		                                            res.send(200);
		                                        });
		                                    });
		                                });
		                            });
		                        } else {
		                            new Transaction({id_Account: account, id_My_Date: my_date._id, amount: amount, concept: name, id_TransactionType: transactionType[0]._id}).save(function(err, transaction) {
		                                quota.paid = true;
		                                quota.Transaction = transaction._id;
		                                quota.save(function(err, quota) {
		                                    obj_account.balance1 = obj_account.balance1 - amount;
		                                    obj_account.save(function(err, account) {
		                                        res.send(200);
		                                    });
		                            	});
		                            });
		                        }
		                    });
		                });
		            }
		        });
			});
}
exports.edit = function(req, res) {
    var id = req.params.id;

    var amount = req.body.amount;
	console.log(amount);
    var account = req.body.Account;

    var day = req.body.day;
    var month = req.body.month;
    var year = req.body.year;
    Quota.findById(id)
            .populate('Transaction')
            .populate('QuotaPayment')
            .exec(function(err, quota) {
				name = "Pago Cuota Nº " + quota.number + " - " + quota.QuotaPayment.concept;
                My_Date.findOne({day: day, month: month, year: year})
                        .exec(function(err, my_date) {
                            if (my_date === null) {
                                new My_Date({day: day, month: month, year: year}).save(function(err, my_date) {
									Account.findById(quota.Transaction.id_Account)
                                        .exec(function(err, before_account) {
                                            before_account.balance1 = before_account.balance1 + quota.amount;
                                            before_account.save(function(err, before_account) {
                                                Transaction.findById(quota.Transaction._id).remove(function(err, transaction) {
                                                    Account.findById(account, function(err, obj_account) {
                                                        TransactionType.find({id_AccountType: obj_account.id_AccountType, name: 'Pago Cuota Crédito'}, function(err, transactionType) {
							                                if (transactionType.length < 1) {
                                                                new TransactionType({id_AccountType: obj_account.id_AccountType, name: 'Pago Cuota ', sign: -1, allowPlace: false, allowConcept: true, automaticTransaction: false, }).save(function(err, transactionType) {
                                                                    new Transaction({id_Account: account, id_My_Date: my_date._id, amount: amount, concept: name, id_TransactionType: transactionType._id}).save(function(err, transaction) {
                                                                        quota.paid = true;
                                                                        quota.Transaction = transaction._id;
                                                                        quota.save(function(err, quota) {
                                                                            obj_account.balance1 = obj_account.balance1 - amount;
                                                                            obj_account.save(function(err, account) {
                                                                                res.send(200);
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            } else {
                                                                new Transaction({id_Account: account, id_My_Date: my_date._id, amount: amount, concept: name, id_TransactionType: transactionType[0]._id}).save(function(err, transaction) {
                                                                    quota.paid = true;
                                                                    quota.Transaction = transaction._id;
                                                                    quota.save(function(err, quota) {
                                                                        obj_account.balance1 = obj_account.balance1 - amount;
                                                                        obj_account.save(function(err, account) {
                                                                            res.send(200);
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
                            } else {
                                Account.findById(quota.Transaction.id_Account)
                                        .exec(function(err, before_account) {
                                            before_account.balance1 = before_account.balance1 + quota.amount;
                                            before_account.save(function(err, before_account) {
                                                Transaction.findById(quota.Transaction._id).remove(function(err, transaction) {
                                                    Account.findById(account, function(err, obj_account) {
                                                        TransactionType.find({id_AccountType: obj_account.id_AccountType, name: 'Pago Cuota Crédito'}, function(err, transactionType) {
							                                if (transactionType.length < 1) {
                                                                new TransactionType({id_AccountType: obj_account.id_AccountType, name: 'Pago Cuota Crédito', sign: -1, allowPlace: false, allowConcept: true, automaticTransaction: false, }).save(function(err, transactionType) {
                                                                    new Transaction({id_Account: account, id_My_Date: my_date._id, amount: amount, concept: name, id_TransactionType: transactionType._id}).save(function(err, transaction) {
                                                                        quota.paid = true;
                                                                        quota.Transaction = transaction._id;
                                                                        quota.save(function(err, quota) {
                                                                            obj_account.balance1 = obj_account.balance1 - amount;
                                                                            obj_account.save(function(err, account) {
                                                                                res.send(200);
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            } else {
                                                                new Transaction({id_Account: account, id_My_Date: my_date._id, amount: amount, concept: name, id_TransactionType: transactionType[0]._id}).save(function(err, transaction) {
																	if(err){console.log(err)}
                                                                    quota.paid = true;
                                                                    quota.Transaction = transaction._id;
                                                                    quota.save(function(err, quota) {
                                                                        obj_account.balance1 = obj_account.balance1 - amount;
                                                                        obj_account.save(function(err, account) {
                                                                            res.send(200);
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
            });
}
exports.destroy = function(req, res) {
    var id = req.params.id;
    Quota.findById(id)
            .populate('Transaction')
            .exec(function(err, quota) {
                Account.findById(quota.Transaction.id_Account, function(err, account) {
                    account.balance1 = account.balance1 + quota.amount;
                    account.save(function(err, account) {
                        Transaction.findById(quota.Transaction._id).remove(function(err, transaction) {
                            quota.paid = false;
                            quota.save(function(err, quota) {
                                res.send(quota);
                            });
                        });
                    });
                });
            });
}
