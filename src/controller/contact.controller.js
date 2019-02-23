let Contact = require("../model/contact.model");

//Handle index actions
// exports.index = (req, res) => {
//   Contact.getMaxListeners((err, contacts) => {
//     if (err) {
//       res.json({
//         status: "error",
//         message: err
//       });
//     }
//     res.json({
//       status: "success",
//       message: "Contacts retrieved successfully",
//       data: contacts
//     });
//   });
// };

exports.index = (req, res) => {
  Contact.find()
    .then(contacts => {
      res.json({
        status: "success",
        message: "Contacts retrieved ",
        data: contacts
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving products."
      });
    });
};

exports.new = (req, res) => {
  var contact = new Contact();
  contact.name = req.body.name ? req.body.name : contact.name;
  contact.gender = req.body.gender;
  contact.email = req.body.email;
  contact.phone = req.body.phone;

  contact.save(err => {
    if (err) res.json(err);
    res.json({
      message: "New contact created!",
      data: contact
    });
  });
};

exports.view = function(req, res) {
  Contact.findById(req.params.contact_id, function(err, contact) {
    if (err) res.send(err);
    res.json({
      message: "Contact details loading..",
      data: contact
    });
  });
};

exports.update = (req, res) => {
  Contact.findById(req.params.contact_id, (err, contact) => {
    if (err) res.send(err);
    // parse body
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;

    contact.save(err => {
      if (err) res.json(err);
      res.json({
        message: "success",
        data: contact
      });
    });
  });
};
