const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("", (req, res) => {
  res.render("index.ejs", { error: null });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username != "devteam" || password != "manchesterunited") {
    let error = "Invalid username or password";
    res.render("index.ejs", { error: error });
  } else {
    res.render("pwned.ejs");
  }
  res.render("home.ejs", { error: null });
});

app.use(function (req, res) {
  res.status(404).render("404.ejs");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...!!!`));
