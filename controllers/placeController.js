var Place = require('../models/place.js')

exports.list = function(req, res) {
  Place.find(function(err, places) {
    res.send(places);
  });
}
exports.show = function(req, res){
    var id = req.params.id;
    Place.findById(id,function(err, place){
        res.send(place);
    });
}
exports.post = function(req, res) {
    var name = req.query.name;
    var description = req.query.description;        
    new Place({name: name, description: description}).save(function(err,place){
        res.send(place);
    }); 
}
exports.edit = function(req, res) {
    var id = req.params.id;
    var name = req.query.name;
    var description = req.query.description;
    Place.findByIdAndUpdate(id,{name: name, description: description},function(err,place){
        res.send(place);
    }); 
}
exports.destroy = function(req, res){
    var id = req.params.id;
    Place.findById(id).remove(function(err, place){
        res.send();
    });
}
