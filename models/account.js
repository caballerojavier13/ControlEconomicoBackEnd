var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var accountSchema = new Schema({
    name: String,
    balance1: Number,
    balance2: Number,
    id_AccountType: { type: Schema.Types.ObjectId, ref: 'AccountType' }
});
 
module.exports = mongoose.model('Account', accountSchema);
