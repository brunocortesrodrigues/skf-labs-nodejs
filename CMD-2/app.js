const express = require("express");
const app = express();
const { exec } = require("child_process");

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));

app.get("", (req, res) => {
  res.render("index.ejs");
});

app.post("/compress", (req, res) => {
  const logType = req.body.console.log(sizeImg);
  res.render("index.ejs");
});

app.use(function (req, res) {
  res.status(404).render("404.ejs");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...!!!`));