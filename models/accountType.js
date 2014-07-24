var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var accountTypeSchema = new Schema({
    name:  String,
    nameBalance1: String,
    nameBalance2: String,
    allowBalance2: Boolean,
    normalOperation: Boolean,
});
 
module.exports = mongoose.model('AccountType', accountTypeSchema);