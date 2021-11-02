const express = require("express");
const app = express();
const { exec } = require("child_process");

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));

app.get("", (req, res) => {
  const system_call = exec("ls -lart");
  res.render("index.ejs", { uploaded: null, script: system_call });
});

app.post("/", (req, res) => {
  res.render("index.ejs", { uploaded: null });
});

app.use(function (req, res) {
  res.status(404).render("404.ejs");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...!!!`));
