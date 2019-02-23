let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let config = require("../../config");

var userSchema = mongoose.Schema({
  account: {
    username: {
      type: String,
      required: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    }
  },
  info: {
    fullName: {
      type: String,
      required: true
    },
    birthDate: {
      type: Date
    },
    age: {
      type: Number
    },
    gender: {
      type: String
    }
  },
  authentication: {
    token: {
      type: String
    },
    createTime: {
      type: String
    }
  },
  confirmationToken: { type: String, default: "" }
});

userSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

userSchema.methods.isValidPassword = function isValidPassword(password) {
  // using bcrypt
  // bcrypt.compareSync(password, this.passwordHash);
  //normal

  let result = password == this.account.passwordHash ? true : false;
  console.log(result);
  return result;
};

userSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      username: this.account.username
    },
    config.JWT_SECRET
  );
};

var User = mongoose.model("user_info", userSchema, "user_info");
module.exports = User;
