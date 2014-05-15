var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var transactionTypeSchema = new Schema({
    name: String,
    sign: Number,
    allowPlace: Boolean,
    allowConcept: Boolean,
    cashAffect: Boolean,
    id_AccountType : { type: Schema.Types.ObjectId, ref: 'AccountType' }
});
 
module.exports = mongoose.model('TransactionType', transactionTypeSchema);