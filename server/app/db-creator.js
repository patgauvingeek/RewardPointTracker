'use strict';

function DbCreator() {
}

var migrations = [
  "./app/migrations/initial.sql"
];

function applyMigrationFrom(db, index)
{
  if (index >= migrations.length)
  {
    db.close();
    return;
  }
  var fs = require('fs');
  console.log("Applying migration #" + index);
  fs.readFile(migrations[index], 'utf8', function(err, content) { 
    if (err)
    {
      db.close();
      return console.error(err.message);
    }
    db.exec(content, function(err) {
      if (err)
      {
        db.close();
        return console.error(err.message);
      }
      console.log("Done.");
      var nextIndex = index + 1;
      db.run("PRAGMA user_version = " + nextIndex + ";", function(err) {
        if (err)
        {
          db.close();
          return console.error(err.message);
        }
        applyMigrationFrom(db, nextIndex);
      });
    });
  });
}

function createIfNotExist() {
  var rewards = require('./rewards');
  
  rewards.Database.connect(function(db)  {
    db.get("PRAGMA user_version;", function(err, row) {
      if (err)
      {
        db.close();
        return console.error(err.message);
      }
      applyMigrationFrom(db, row.user_version);
    });
  });
}

DbCreator.prototype = {
  createIfNotExist: createIfNotExist
};

var DbCreator = new DbCreator();

module.exports = DbCreator;
