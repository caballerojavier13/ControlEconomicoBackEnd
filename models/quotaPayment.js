var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var quotaPaymentSchema = new Schema({
    concept: String,
    quantityQuota: Number,
    amount: Number,
    paid: Boolean,
    My_Date : { type: Schema.Types.ObjectId, ref: 'My_Date' },
    Place : { type: Schema.Types.ObjectId, ref: 'Place' },
    Account : { type: Schema.Types.ObjectId, ref: 'Account' }
});
 
module.exports = mongoose.model('QuotaPayment', quotaPaymentSchema);
