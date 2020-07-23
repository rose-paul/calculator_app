const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const axios = require("axios");

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(port);