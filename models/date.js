var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var dateSchema = new Schema({
    day: Number,
    month: Number,
    year: Number
});
 
module.exports = mongoose.model('Date', dateSchema);
