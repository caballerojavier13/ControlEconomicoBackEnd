var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var accountTypeSchema = new Schema({
    name:  String,
    description: String
});
 
module.exports = mongoose.model('AccountType', accountTypeSchema);
