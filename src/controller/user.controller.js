const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const config = require("../../config");

// Check username is existed? to register account
exports.checkUsername = (req, res) => {
  const reqData = req.params;

  UserModel.findOne({ "account.username": reqData.username }).then(userInfo => {
    if (userInfo) {
      res.status(400).json({ errors: { global: "Existed Username" } });
    } else {
      res.json({ status: "success", message: "Valid Username" });
    }
  });
};

// Register
exports.register = (req, res) => {
  const accountInfomartion = req.body;

  UserModel.create(accountInfomartion, function(err, responsive) {
    if (err) {
      res
        .status(400)
        .json({ errors: { global: "Register fail", message: err } });
    } else {
      res.json({
        status: "success",
        code: 200,
        message: "Register successfully",
        data: responsive
      });
    }
  });
};

// Login
exports.authen = async (req, res) => {
  const reqData = req.body;
  console.log(reqData);

  await UserModel.findOne({ "account.username": reqData.username }).then(userInfo => {
    if (userInfo && userInfo.isValidPassword(reqData.password)) {
      const token = await createToken(userInfo);
      // createToken(userInfo);
      // const token = "";
      console.log(`token is: ${token}`);

      res.json({
        status: "success",
        code: 200,
        message: "Authen pass",
        data: { token }
      });
    } else {
      res.status(400).json({ errors: { global: "Invalid account" } });
    }
  });
};

let createToken = async user => {
  const token = jwt.sign({ sub: user._id }, config.JWT_SECRET);

  var result = await UserModel.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        "authentication.token": token,
        "authentication.createTime": Date.now()
      }
    },
    { returnNewDocument: true }
  );

  console.log(`result: ${result}`);

  return result;
  // userNewDocument.exec(function(err, newData) {
  //   if (err) {
  //     return "";
  //   }
  //   return newData.authentication.token;
  // });
};
