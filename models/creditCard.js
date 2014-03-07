var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ,ObjectId = Schema.ObjectId;
 
var creditCardSchema = new Schema({
    name:  String,
    number: String,
    id_debitCard : { type: Schema.Types.ObjectId, ref: 'DebitCard' }
});
 
module.exports = mongoose.model('CreditCard', creditCardSchema);
