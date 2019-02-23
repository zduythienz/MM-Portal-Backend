let mongoose = require("mongoose");

//Setup schema
var countersSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    required: true
  }
});

var Counters = mongoose.model("counters", countersSchema, "counters");
module.exports = Counters;
