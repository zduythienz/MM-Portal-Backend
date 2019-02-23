let fs = require("fs");

let readBanner = () => {
  try {
    let data = fs.readFileSync("banner.txt", "utf8");
    console.log(data);
  } catch (e) {
    console.log(`error : ${e.stack} `);
  }
};

module.exports.readBanner = readBanner;
