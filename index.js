let express = require("express");
let apiRouters = require("./api-routes");
let { readBanner } = require("./common/ReadBanner");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
const config = require("./config.js");
let cros = require("./src/middlewares/configCros");

let app = express();
app.get("/", function(req, res) {
  res.send("Hello world");
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
// config header
app.use(cros);

app.use("/api/v1", apiRouters);

mongoose
  .connect(config.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
let db = mongoose.connection;

app.listen(config.serverport, function() {
  console.log(`Server is running in: ${config.serverport}`);
  console.log(`Design by:`);
  readBanner();
});
