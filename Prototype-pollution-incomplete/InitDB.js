var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./Database.db3");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users(UserId INT, UserName TEXT, Password TEXT)"
  );
  db.run("INSERT OR IGNORE INTO users VALUES(1,'admin','admin')");
  db.run("INSERT OR IGNORE INTO users VALUES(2,'guest','guest')");

  db.run(
    "CREATE TABLE IF NOT EXISTS messages(messageId INT, content TEXT, userId INT)"
  );
  db.run("INSERT OR IGNORE INTO messages VALUES(1 ,'First Message', 1)");
});
