var dCard = require('../models/debitCard.js')
var dMovement = require('../models/debitMovement.js')

exports.list = function(req, res) {
  dCard.find(function(err, cards) {
    res.send(cards);
  });
}
exports.show = function(req, res){
    var id = req.params.id;
    dCard.findById(id,function(err, card){
        res.send(card);
    });
}
exports.movements = function(req, res){
    var id = req.params.id;
    dMovement.find({id_debitCard: id})
    .populate('id_debitMovementType')
    .populate('id_date')
    .exec(function(err, movements) {
        res.send(movements);
    });
}
exports.post = function(req, res) {
    var name = req.query.name;
    var number = req.query.number;
    var initial_balance = req.query.initial_balance;
    new dCard({name: name, number: number, initialBalance: initial_balance}).save(function(err,card){
        res.send(card);
    }); 
}
exports.edit = function(req, res) {
    var id = req.params.id;
    var name = req.query.name;
    var number = req.query.number;
    var initial_balance = req.query.initial_balance;
    dCard.findByIdAndUpdate(id,{name: name, number: number, initialBalance: initial_balance},function(err,card){
        res.send(card);
    }); 
}
exports.destroy = function(req, res){
    var id = req.params.id;
    dCard.findById(id).remove(function(err, card){
        res.send();
    });
}
