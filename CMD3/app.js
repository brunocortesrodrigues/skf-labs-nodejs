const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ uriDecodeFileNames: true }));

const ALLOWED_EXTENSIONS = ["txt", "pdf", "png", "jpg", "jpeg", "html", "ejs"];

const allowed_file = (filename) => {
  const extension = filename.split(".").pop();
  return ALLOWED_EXTENSIONS.includes(extension);
};

const system_call = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error);
      }
      resolve(stdout);
    });
  });
};

app.get("/", async (req, res) => {
  res.render("index.ejs", {
    uploaded: null,
    system_call: await system_call("ls -l"),
  });
});

app.post("/", async (req, res) => {
  const file = req.files.file;
  const filePath = "upload/" + file.name;
  if (file && allowed_file(file.name)) {
    file.mv(filePath, async (err) => {
      if (err) return res.status(500).send(err);
      res.render("index.ejs", {
        uploaded: "File uploaded successfully",
        system_call: await system_call(),
      });
    });
  } else {
    res.render("index.ejs", {
      uploaded: "File not allowed",
      system_call: await system_call(),
    });
  }
});

app.use(function (req, res) {
  res.status(404).render("404.ejs");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...!!!`));
