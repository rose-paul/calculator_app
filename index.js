const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const {Client} = require("pg");

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/test", (req, res) => {
  res.send("connected")
})

app.listen(port);