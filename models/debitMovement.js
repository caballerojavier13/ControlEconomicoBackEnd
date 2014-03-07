var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var debitMovementSchema = new Schema({
    amount: Number,
    id_place : { type: Schema.Types.ObjectId, ref: 'Place' },
    id_date : { type: Schema.Types.ObjectId, ref: 'Date' },
    id_debitMovementType : { type: Schema.Types.ObjectId, ref: 'DebitMovementType' },
    id_debitCard : { type: Schema.Types.ObjectId, ref: 'DebitCard' },
    id_creditCard : { type: Schema.Types.ObjectId, ref: 'CreditCard' } 
});
 
module.exports = mongoose.model('DebitMovement', debitMovementSchema);
