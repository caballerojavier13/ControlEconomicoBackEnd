var TransactionType  = require('../models/transactionType.js')

exports.list = function(req, res) {
  TransactionType.find()
  .populate('id_AccountType')
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
    var cashAffect = req.query.cashAffect;
    var id_AccountType = req.query.id_AccountType;
    new TransactionType({name: name, sign: sign, allowPlace: allowPlace, allowConcept: allowConcept,cashAffect: cashAffect, id_AccountType: id_AccountType}).save(function(err,transactionType){
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
    var cashAffect = req.query.cashAffect;
    var id_AccountType = req.query.id_AccountType;
    TransactionType.findByIdAndUpdate(id,{name: name, sign: sign, allowPlace: allowPlace,cashAffect: cashAffect, allowConcept: allowConcept, id_AccountType: id_AccountType})
    .populate('id_AccountType')
    .exec(function(err,transactionType){
        res.send(transactionType);
    }); 
}
exports.destroy = function(req, res){
    var id = req.params.id;
    TransactionType.findById(id).remove(function(err, transactionType){
        res.send();
    });
}