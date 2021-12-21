const express = require("express");
const session = require("express-session");
const _ = require("lodash");
const app = express();

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
  })
);

const users = [
  { name: "user", password: "123456" },
  { name: "admin", password: "admin", canPost: true },
];

let messages = [];
let id = 1;

const findUser = (user, pwd) => {
  return users.find((u) => u.name === user && u.password === pwd);
};

app.get("", (req, res) => {
  res.render("index.ejs");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = findUser(username, password);
  if (user) {
    req.session.user = user;
    res.render("home.ejs", { xss: null });
  }
});

app.post("/home", (req, res) => {
  if (req.session.user.canPost) {
    let userInput = req.body.string;
    const message = { title: "test" };
    _.merge(message, userInput, {
      id: id++,
      user: req.session.user,
    });
    console.log(req.session.user);
    messages.push(message);
    console.log(messages);
    res.render("home.ejs", { xss: userInput });
  } else {
    res.render("home.ejs", { xss: null });
  }
});

app.use(function (req, res) {
  res.status(404).render("404.ejs");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...!!!`));
