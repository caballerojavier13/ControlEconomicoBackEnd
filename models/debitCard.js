var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var debitCardSchema = new Schema({
    name:  String,
    number: String,
    initialBalance: Number
});
 
module.exports = mongoose.model('DebitCard', debitCardSchema);