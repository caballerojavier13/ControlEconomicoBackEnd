var cCard = require('../models/creditCard.js')

exports.list = function(req, res) {
  cCard.find(function(err, cards) {
    res.send(cards);
  });
}
exports.show = function(req, res){
    var id = req.params.id;
    cCard.findById(id,function(err, card){
        res.send(card);
    });
}
exports.post = function(req, res) {
    var name = req.query.name;
    var number = req.query.number;
    var debit_card = req.query.debit_card;
    new cCard({name: name, number: number, id_debitCard : debit_card}).save(function(err,card){
        res.send(card);
    }); 
}
exports.edit = function(req, res) {
    var id = req.params.id;
    var name = req.query.name;
    var number = req.query.number;
    var debit_card = req.query.debit_card;
    cCard.findByIdAndUpdate(id,{name: name, number: number, id_debitCard : debit_card},function(err,card){
        res.send(card);
    }); 
}
exports.destroy = function(req, res){
    var id = req.params.id;
    cCard.findById(id).remove(function(err, card){
        res.send();
    });
}
