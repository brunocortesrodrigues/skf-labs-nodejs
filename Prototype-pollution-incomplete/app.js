const express = require("express");
const _ = require("lodash");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./Database.db3");

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded());
app.use(express.json());

let messages = [];
let lastId = 1;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/home", (req, res) => {
  /* db.get("SELECT * FROM messages", (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.log(row);
      res.render("home.ejs", { messages: row });
    }
  }); */
  console.log(messages);
  res.render("home.ejs", { messages: messages });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.get(sql, [username, password], (err, row) => {
    if (row) {
      res.redirect(302, "/home");
    } else {
      res.redirect(302, "/");
    }
  });
});

app.post("/home", (req, res) => {
  const message = {
    icon: "👋",
  };

  _.merge(message, {
    content: req.body.message,
    id: lastId++,
    timestamp: Date.now(),
  });

  messages.push(message);
  /*   db.run(
    "INSERT INTO messages (messageId, content, userId) VALUES (?, ?, ?)",
    [2, req.body.message, message.timestamp],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully inserted message");
      }
    }
  ); */
  res.render("home.ejs", { messages: message });
});

app.delete("/", (req, res) => {
  const user = findUser(req.body.auth || {});

  if (!user || !user.canDelete) {
    res.status(403).send({ ok: false, error: "Access denied" });
    return;
  }

  messages = messages.filter((m) => m.id !== req.body.messageId);
  res.send({ ok: true });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...!!!`));
