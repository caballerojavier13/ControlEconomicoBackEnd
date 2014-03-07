var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var generalParameterSchema = new Schema({
    initialDailySpending: Number,
    cashBalance: Number 
});
 
module.exports = mongoose.model('GeneralParameter', generalParameterSchema);
