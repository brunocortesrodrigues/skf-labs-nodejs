const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));

app.get("", (req, res) => {
  const date = new Date()
  const time = date.getHours() + ":" + date.getMinutes();
  const csrf_token = "admin" + time
  console.log(csrf_token)
  res.render("evil.ejs", { csrf_token: csrf_token});
});

app.use(function (req, res) {
  res.status(404).render("404.ejs");
});

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`Listening on port ${port}...!!!`));
