var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var generalParameterSchema = new Schema({
});
 
module.exports = mongoose.model('GeneralParameter', generalParameterSchema);
