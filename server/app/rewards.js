'use strict';

var sqlite3 = require("sqlite3").verbose();
var settingsConfig = require("./config/settings/settings-config");

var Database = function () {};

Database.prototype.connect = function (runQueries) {
  var db = new sqlite3.Database(settingsConfig.settings.databaseFilename);
  // makes sure the foreign keys are activated.
  db.run("PRAGMA foreign_keys = ON;", function(err) {
    if (err) {
      console.error(err.message);
    }
    runQueries(db);
  });
};

exports.Database = new Database();