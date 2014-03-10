var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var debitMovementTypeSchema = new Schema({
    name:  String,
    description: String,
    sign: Number
});
 
module.exports = mongoose.model('DebitMovementType', debitMovementTypeSchema);
