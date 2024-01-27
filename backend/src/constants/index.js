const path = require("path");

// module.exports.password_secret = "q1w2Q!W@";
module.exports.password_secret = "asdf";
module.exports.data_path = path.join(
  __dirname.replace("/constants", ""),
  "data",
);
module.exports.images_path = path.join(
  __dirname.replace("/constants", ""),
  "images",
);
