var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var quotaPaymentSchema = new Schema({
    amountQuota: Number,
    quantityQuota: Number,
    quotas : [{ type: Schema.Types.ObjectId, ref: 'Quota' }],
    id_Account : { type: Schema.Types.ObjectId, ref: 'Account' }
});
 
module.exports = mongoose.model('QuotaPayment', quotaPaymentSchema);
