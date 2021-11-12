const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const app = express();
const db = new sqlite3.Database("./Database.db3");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  sessions({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
  })
);

app.get("", (req, res) => {
  res.render("index.ejs");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.get(sql, [username, password], (err, row) => {
    if (row) {
      let session = req.session;
      session.userId = row.UserId;
      db.get("SELECT * FROM preferences", (err, row) => {
        if (row) {
          res.render("home.ejs", { color: row.Color });
        } else {
          res.render("home.ejs", { color: null });
        }
      });
    } else {
      res.render("");
    }
  });
});

// missing authentication for /update

app.post("/update", (req, res) => {
  const sql = "UPDATE preferences SET Color = ? WHERE UserId = ?";
  db.run(sql, [req.body.color, req.session.userId], (err) => {
    if (err) {
      console.log(err);
    } else {
      db.get("SELECT * FROM preferences", (err, row) => {
        if (row) {
          res.render("home.ejs", { color: row.Color });
        } else {
          res.render("home.ejs", { color: null });
        }
      });
    }
  });
});

app.use(function (req, res) {
  res.status(404).render("404.ejs");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...!!!`));
