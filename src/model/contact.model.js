let mongoose = require("mongoose");

//Setup schema
var contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: String,
  phone: String
});

var Contact = mongoose.model("contact", contactSchema, "contact");
module.exports = Contact;
