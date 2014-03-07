var Place = require('../models/place.js')

exports.list = function(req, res) {
  Place.find(function(err, places) {
    res.send(places);
  });
}
//corregir
exports.post = function(req, res) {
    var name = req.params[0];
    var description = req.params[1];
    console.log(name);
    console.log(description);
    res.send(new Place({name: name, description: description}).save());
  
}