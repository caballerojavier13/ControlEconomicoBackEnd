var QuotaPayment = require('../models/quotaPayment.js');
var Quota = require('../models/quota.js');
var My_Date = require('../models/my_date.js');
var Account = require('../models/account.js');
var Transaction = require('../models/transaction.js');

var query = require('array-query');

exports.listAcountCount = function(req, res) {
    var account = req.params.account;
    QuotaPayment.find({Account: account})
    .count(function(err, quotaPayments) {
      res.send({total: quotaPayments});
    });
}
exports.listAcount = function(req, res) {
    var account = req.params.account;
    var offset = req.query.offset;
    var limit = req.query.limit;
    QuotaPayment.find({Account: account})
    .populate('My_Date')
    .populate('Place')
    .populate('Account')
    .exec(function(err, quotaPayments) {
       res.send(
         query()
        .sort()
        .custom(function(obj1, obj2) {
           return obj2.My_Date.year - obj1.My_Date.year;
         })
         .sort()
        .custom(function(obj1, obj2) {
           return obj2.My_Date.month - obj1.My_Date.month;
         })
         .sort()
        .custom(function(obj1, obj2) {
           return obj2.My_Date.day - obj1.My_Date.day;
         })
        .offset(offset)
        .limit(limit)
        .on(quotaPayments));
    });
}
exports.listAllCount = function(req, res) {
    var account = req.params.account;
    QuotaPayment.find()
    .count(function(err, quotaPayments) {
      res.send({total: quotaPayments});
    });
}
exports.listAll = function(req, res) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    QuotaPayment.find()
    .populate('My_Date')
    .populate('Place')
    .populate('Account')
    .exec(function(err, quotaPayments) {
       res.send(
         query()
        .sort()
        .custom(function(obj1, obj2) {
           return obj2.My_Date.year - obj1.My_Date.year;
         })
         .sort()
        .custom(function(obj1, obj2) {
           return obj2.My_Date.month - obj1.My_Date.month;
         })
         .sort()
        .custom(function(obj1, obj2) {
           return obj2.My_Date.day - obj1.My_Date.day;
         })
        .offset(offset)
        .limit(limit)
        .on(quotaPayments));
    });
}
exports.show = function(req, res){
    var id = req.params.id;
    QuotaPayment.findById(id)
    .populate('My_Date')
    .populate('Account')
    .populate('Place')
    .exec(function(err, quotaPayment){
        res.send(quotaPayment);
    });
}
exports.post = function(req, res) {
    var concept = req.body.concept;
    var amount = req.body.amount;
    var place = req.body.Place;
    var account = req.body.Account;
    var quotas = req.body.quotas;

    var day = req.body.day;
    var month = req.body.month;
    var year = req.body.year;
    My_Date.findOne({day: day, month:month, year: year})
    .exec(function(err, my_date){
      if(my_date === null){
        new My_Date({day: day, month:month, year: year}).save(function(err,my_date){
		  	new QuotaPayment({concept:concept,My_Date:my_date, amount:amount,Place: place,Account: account}).save(function(err,quotaPayment){
				var array = quotas.split(",");
				var i = 0;
				for(i = 0; i < array.length; i++){
					if(i === (array.length - 1)){
						month = parseInt(month) + 1;
						if(parseInt(month) > 12){
							year = parseInt(year) + 1;
							month = 1;
							new Quota({month: month, year: year, number: (i + 1), amount: parseFloat(array[i]), QuotaPayment: quotaPayment._id}).save(function(err,quota){
						 		res.send(quotaPayment);	
							});				
						}else{
							new Quota({month: month, year: year, number: (i + 1), amount: parseFloat(array[i]), QuotaPayment: quotaPayment._id}).save(function(err,quota){
						 		res.send(quotaPayment);	
							});				
						}
					}else{
						month = parseInt(month) + 1;
						if(parseInt(month) > 12){
							year = parseInt(year) + 1;
							month = 1;
							new Quota({month: month, year: year, number: (i + 1), amount: array[i], QuotaPayment: quotaPayment._id}).save();
						}else{
							new Quota({month: month, year: year, number: (i + 1), amount: array[i], QuotaPayment: quotaPayment._id}).save();
						}

					}
				}
			}); 
        });
      }else{
	  	new QuotaPayment({concept:concept,My_Date:my_date, amount:amount,Place: place,Account: account}).save(function(err,quotaPayment){
			var array = quotas.split(",");
			var i = 0;
			for(i = 0; i < array.length; i++){
				if(i === (array.length - 1)){
					month = parseInt(month) + 1;
					if(parseInt(month) > 12){
						year = parseInt(year) + 1;
						month = 1;
						new Quota({month: month, year: year, number: (i + 1), amount: parseFloat(array[i]), QuotaPayment: quotaPayment._id, paid: false}).save(function(err,quota){
					 		res.send(quotaPayment);	
						});				
					}else{
						new Quota({month: month, year: year, number: (i + 1), amount: parseFloat(array[i]), QuotaPayment: quotaPayment._id, paid: false}).save(function(err,quota){
					 		res.send(quotaPayment);	
						});				
					}
				}else{
					month = parseInt(month) + 1;
					if(parseInt(month) > 12){
						year = parseInt(year) + 1;
						month = 1;
						new Quota({month: month, year: year, number: (i + 1), amount: array[i], QuotaPayment: quotaPayment._id, paid: false}).save();
					}else{
						new Quota({month: month, year: year, number: (i + 1), amount: array[i], QuotaPayment: quotaPayment._id, paid: false}).save();
					}

				}
			}
		}); 
      }
    });
}
exports.edit = function(req, res) {
    var id = req.params.id;
    var concept = req.body.concept;
    var place = req.body.Place;

    var day = req.body.day;
    var month = req.body.month;
    var year = req.body.year;
    My_Date.findOne({day: day, month:month, year: year})
    .exec(function(err, my_date){
    	if(my_date === null){
      		new My_Date({day: day, month:month, year: year}).save(function(err,my_date){
  	      		QuotaPayment.findById(id,function(err,accountType){
		 			accountType.concept = concept; 
                	accountType.My_Date = my_date;
			 		accountType.Place = place;
		    		accountType.save(function(err,accountType){
		   				res.send(accountType);
				 	});     
              	}); 
        	});
      	}else{
			QuotaPayment.findById(id,function(err,accountType){
   	   			accountType.concept = concept; 
   	   			accountType.My_Date = my_date;
   	   			accountType.Place = place;
   	   			accountType.save(function(err,accountType){
	 				res.send(accountType);
   	   			});         
   			});
      	}
    });
}
exports.destroy = function(req, res){
    var id = req.params.id;
	Quota.find({QuotaPayment: id},function(err, quotas){
		if(quotas.length > 0){
			var i = 0;
			for(i = 0; i< quotas.length; i++){
				if(i === (quotas.length - 1)){
					Quota.findById(quotas[i]._id)
						.populate('Transaction')
						.exec(function(err, quota) {
						    Account.findById(quota.Transaction.id_Account, function(err, account) {
						        account.balance1 = account.balance1 + quota.amount;
						        account.save(function(err, account) {
						            Transaction.findById(quota.Transaction._id).remove(function(err, transaction) {
						                quota.paid = false;
						                quota.save(function(err,quota){
											QuotaPayment.findById(id).remove(function(err, accountType){
											  res.send(200);
											});
										});
						            });
						        });
						    });
						});			
				}else{
					Quota.findById(quotas[i]._id)
						.populate('Transaction')
						.exec(function(err, quota) {
						    Account.findById(quota.Transaction.id_Account, function(err, account) {
						        account.balance1 = account.balance1 + quota.amount;
						        account.save(function(err, account) {
						            Transaction.findById(quota.Transaction._id).remove(function(err, transaction) {
						                quota.paid = false;
						                quota.save();
						            });
						        });
						    });
						});
				}
			}
		}else{
			QuotaPayment.findById(id).remove(function(err, accountType){
			  res.send(200);
			});
		}
	});

}
