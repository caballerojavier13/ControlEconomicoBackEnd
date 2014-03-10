var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var placeSchema = new Schema({
    name:  String,
    description: String
});
 
module.exports = mongoose.model('Place', placeSchema);
