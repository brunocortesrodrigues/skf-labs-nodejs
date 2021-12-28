const express = require("express");
const app = express();
const http = require("http");

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));

app.get("", (req, res) => {
  res.render("index.ejs");
});

app.get("/allowed", (req, res) => {
  const content = http.get("http://0.0.0.0:5000/allowed", (response) => {
    response.on("data", (content) => {
      res.render("index.ejs", { content: content });
    });
  });
});

app.get("/protected", (req, res) => {
  const content = http.get("http://0.0.0.0:5000/protected", (response) => {
    response.on("data", (content) => {
      res.render("index.ejs", { content: content });
    });
  });
  res.render("index.ejs");
});

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`Listening on port ${port}...!!!`));
