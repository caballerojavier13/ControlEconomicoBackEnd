var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ,ObjectId = Schema.ObjectId;
 
var buyCreditSchema = new Schema({
    amount: Number,
    id_place : { type: Schema.Types.ObjectId, ref: 'Place' },
    id_date : { type: Schema.Types.ObjectId, ref: 'Date' }
});
 
module.exports = mongoose.model('BuyCredits', buyCreditSchema);

