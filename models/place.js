var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var placeSchema = new Schema({
    name:  String,
    desciption: String
});
 
module.exports = mongoose.model('Place', placeSchema);
