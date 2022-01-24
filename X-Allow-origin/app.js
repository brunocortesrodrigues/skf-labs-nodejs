const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("", (req, res) => {
  res.render("index.ejs", { output: null });
});

app.get("/allowed", cors(), (req, res) => {
  res.render("index.ejs", { output: "allowed" });
});

app.get("/protected", (req, res) => {
  res.render("index.ejs", { output: "protected" });
});

app.use(function (req, res) {
  res.status(404).render("404.ejs");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...!!!`));
