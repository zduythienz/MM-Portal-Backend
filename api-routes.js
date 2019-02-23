let router = require("express").Router();
let fs = require("fs");

//set defaul API response
router.get("/", (req, res) => {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub mainpage"
  });
});

//import all router
require("./src/routes/contact.routes")(router);
require("./src/routes/user.route")(router);

module.exports = router;
