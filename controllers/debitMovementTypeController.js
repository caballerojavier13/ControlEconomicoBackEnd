var DMT = require('../models/debitMovementType.js')

exports.list = function(req, res) {
  DMT.find(function(err, types) {
    res.send(types);
  });
}
exports.show = function(req, res){
    var id = req.params.id;
    DMT.findById(id,function(err, type){
        res.send(type);
    });
}
exports.post = function(req, res) {
    var name = req.query.name;
    var description = req.query.description;
    var sign = req.query.sign;
    new DMT({name: name, description: description, sign: sign}).save(function(err,type){
        res.send(type);
    }); 
}
exports.edit = function(req, res) {
    var id = req.params.id;
    var name = req.query.name;
    var description = req.query.description;
    var sign = req.query.sign;
    DMT.findByIdAndUpdate(id,{name: name, description: description, sign: sign},function(err,type){
        res.send(type);
    }); 
}
exports.destroy = function(req, res){
    var id = req.params.id;
    DMT.findById(id).remove(function(err, type){
        res.send();
    });
}
