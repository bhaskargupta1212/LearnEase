const db = require("../config/db");

exports.findByEmail = (email, cb) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], cb);
};

exports.create = (data, cb) => {
  db.query("INSERT INTO users SET ?", data, cb);
};
