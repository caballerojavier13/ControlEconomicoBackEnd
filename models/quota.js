var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var quotaSchema = new Schema({
    month: Number,
    year: Number,
	number: Number,
    amount: Number,
    paid: Boolean,
    Transaction : { type: Schema.Types.ObjectId, ref: 'Transaction' },
    QuotaPayment : { type: Schema.Types.ObjectId, ref: 'QuotaPayment' }
});
 
module.exports = mongoose.model('Quota', quotaSchema);
