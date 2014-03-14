var dMovement = require('../models/debitMovement.js')
var Place = require('../models/place.js')
var my_date = require('../models/my_date.js')
var DMT = require('../models/debitMovementType.js')
var dCard = require('../models/debitCard.js')
var cCard = require('../models/creditCard.js')

exports.list = function(req, res) {
  dMovement.find(function(err, movements) {
        res.send(movements);
    });
}
exports.show = function(req, res){
    var id = req.params.id; 
    dMovement.findById(id,function(err, movement){
        res.send(movement);
    });
}
exports.post = function(req, res) {
    var amount = req.query.amount;
    var place = req.query.place;
    var type = req.query.type;
    var debit_card = req.query.debit_card;
    var credit_card = req.query.credit_card;

    var day = req.query.day;
    var month = req.query.month; 
    var year = req.query.year; 

    my_date.findOne()
        .where('day').equals(day)
        .where('month').equals(month)
        .where('year').equals(year)
        .exec(function(err, ref_date){

            if(!ref_date){
                new my_date({day: day, month: month, year: year}).save(function(err, ref_date){
                    new dMovement({amount: amount, id_place: place, id_debitMovementType:type, id_debitCard: debit_card, id_creditCard: credit_card, id_date: ref_date._id}).save(function(err,movement){
                        dMovement.findById(movement._id)
                            .populate('id_debitMovementType')
                            .populate('id_date')
                            .exec(function(err,movement){
                                res.send(movement);
                            });
                    });     
                });
            }else{
                new dMovement({amount: amount, id_place: place, id_debitMovementType:type, id_debitCard: debit_card, id_creditCard: credit_card, id_date: ref_date._id}).save(function(err,movement){
                    dMovement.findById(movement._id)
                        .populate('id_debitMovementType')
                        .populate('id_date')
                        .exec(function(err,movement){
                            res.send(movement);
                        });
                }); 
            }
    });

}
exports.edit = function(req, res) {
    var id = req.params.id;
    var amount = req.query.amount;
    var place = req.query.place;
    var type = req.query.type;
    var credit_card = req.query.credit_card;

    var day = req.query.day;
    var month = req.query.month;
    var year = req.query.year; 
    my_date.findOne()
        .where('day').equals(day)
        .where('month').equals(month)
        .where('year').equals(year)
        .exec(function(err, ref_date){
            if(!err){
                if(!ref_date){
                    new my_date({day: day, month: month, year: year}).save(function(err, ref_date){
                        dMovement.findById(id,function(err,movement){
                            movement.amount = amount;
                            movement.id_place = place;
                            movement.id_debitMovementType = type;
                            movement.id_creditCard = credit_card;
                            movement.id_date = ref_date._id;
                            movement.save(function(err, movement){
                                dMovement.findById(movement._id)
                                    .populate('id_debitMovementType')
                                    .populate('id_date')
                                    .exec(function(err,movement){
                                        res.send(movement);
                                    });
                            });
                        });
                    });
                }else{
                        dMovement.findById(id,function(err,movement){
                            movement.amount = amount;
                            movement.id_place = place;
                            movement.id_debitMovementType = type;
                            movement.id_creditCard = credit_card;
                            movement.id_date = ref_date._id;
                            movement.save(function(err, movement){
                                dMovement.findById(movement._id)
                                    .populate('id_debitMovementType')
                                    .populate('id_date')
                                    .exec(function(err,movement){
                                        res.send(movement);
                                    });
                            });
                        });
                }
            }
    });
    

}
exports.destroy = function(req, res){
    var id = req.params.id;
    dMovement.findById(id).remove(function(err, movement){
        res.send();
    });
}
