var sqlite3 = require("sqlite3").verbose();

var Database = function () {};

Database.prototype.connect = function (runQueries) {
  db = new sqlite3.Database("./rewards.db");
  // makes sure the foreign keys are activated.
  db.run("PRAGMA foreign_keys = ON;", err => {
    if (err)
      console.error(err.message);
    runQueries(db);
  });
};

exports.Database = new Database();