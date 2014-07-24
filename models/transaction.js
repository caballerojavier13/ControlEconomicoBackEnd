var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var transactionSchema = new Schema({
    amount: Number,
    concept: String,
    id_My_Date : { type: Schema.Types.ObjectId, ref: 'My_Date' },
    id_Place : { type: Schema.Types.ObjectId, ref: 'Place' },
    id_TransactionType : { type: Schema.Types.ObjectId, ref: 'TransactionType' },
    id_Account : { type: Schema.Types.ObjectId, ref: 'Account' },
    automaticTransaction : { type: Schema.Types.ObjectId, ref: 'Transaction' }
});
 
module.exports = mongoose.model('Transaction', transactionSchema);