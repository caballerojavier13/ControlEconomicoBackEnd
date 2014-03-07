var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var buyQuotaSchema = new Schema({
    amountQuota: Number,
    quantityQuota: Number,
    id_buyCredit : { type: Schema.Types.ObjectId, ref: 'BuyCredit' },
    id_creditCard : { type: Schema.Types.ObjectId, ref: 'CreditCard' },
    quotas : [{ type: Schema.Types.ObjectId, ref: 'Quota' }]
});
 
module.exports = mongoose.model('BuyQuota', buyQuotaSchema);
