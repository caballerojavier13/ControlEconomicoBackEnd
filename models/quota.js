var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var quotaSchema = new Schema({
    number: Number,
    paid: Boolean
});
 
module.exports = mongoose.model('Quota', quotaSchema);
