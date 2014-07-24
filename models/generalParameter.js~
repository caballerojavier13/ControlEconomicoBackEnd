var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var generalParameterSchema = new Schema({
    cashAffect : { type: Schema.Types.ObjectId, ref: 'Account' }
});
 
module.exports = mongoose.model('GeneralParameter', generalParameterSchema);