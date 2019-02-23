module.exports = router => {
  const UserController = require("../controller/user.controller");

  // checkname
  router.get("/checkUsername/:username", UserController.checkUsername);

  // Retrieve all Products
  router.post("/authen", UserController.authen);

  // Register
  router.post("/register", UserController.register);

  // Retrieve a single Product with productId
  //   router.get("/contact/:contact_id", contact.view);

  // Update a Note with productId
  //   router.put("/contact/:contact_id", contact.update);

  // Delete a Note with productId
  //   app.delete("/products/:productId", products.delete);
};
