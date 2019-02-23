module.exports = router => {
  const contact = require("../controller/contact.controller");

  // Create a new Product
  router.post("/contact", contact.new);

  // Retrieve all Products
  router.get("/contact", contact.index);

  // Retrieve a single Product with productId
  router.get("/contact/:contact_id", contact.view);

  // Update a Note with productId
  router.put("/contact/:contact_id", contact.update);

  // Delete a Note with productId
  //   app.delete("/products/:productId", products.delete);
};
