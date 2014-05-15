var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var my_dateSchema = new Schema({
    day: Number,
    month: Number,
    year: Number
});
 
module.exports = mongoose.model('My_Date', my_dateSchema);
