const cookieSession = require("cookie-session");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const cors = require("cors");
const db = new sqlite3.Database("./Database.db3");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["woopie"],
    maxAge: 86400000,
  })
);

var corsOptions = {
  origin: "*",
  methods: ["GET"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "contentType",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
  origin: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.get("", (req, res) => {
  res.render("index.ejs");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.get(sql, [username, password], (err, row) => {
    if (row) {
      req.session.userId = row.UserId;
      req.session.loggedIn = true;
      res.redirect("/confidential");
    }
  });
});

app.get("/confidential", (req, res) => {
  if (req.session.loggedIn) {
    res.render("loggedin.ejs");
  } else {
    res.render("index.ejs");
  }
});

app.use(function (req, res) {
  res.status(404).render("404.ejs");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...!!!`));
