const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { calculate } = require("./calculator.js");
require("dotenv").config();

app.use(express.static(__dirname));

// TO PARSE REQ BODY FROM FRONTEND
var bodyParser = require("body-parser");
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// DB CONNECTION
const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.connectionString
})
client.connect().then(() => "connected successfuly").catch(e => console.log(e)).finally(() => client.end );


// ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
/* post operation to db */
app.post("/operation", (req, res) => {
  const result = calculate(req.body.operations);
  const newValue = [...req.body.operations, "=", result].join(" ");
  const text = `INSERT INTO entries (entry) VALUES ($1)`;
  client.query(text, newValue)
  .then( result => console.log('successful'))
  .catch( err => console.log(err.stack) )
})
/* fetch recent 10 from db on load */
app.get("/recent", (req, res) => {
  client.query('SELECT * FROM entries ORDER BY created_at DESC LIMIT 10')
  .then(result => {
      res.send(result.rows);
    })
    .catch(err => res.status(404).json(err));
})

// WEB SOCKET
io.on("connection", (socket) => {
  console.log("conection established!");
  socket.on("message", function(data) {
    console.log(`recieved your message:`, data);
  });
  socket.on("disconnect", () => {
    console.log('user gone')
  })
});

http.listen(port, () => {
  console.log("listening on *:8080");
});

// PORT
// app.listen(port, () => console.log(`listening on port ${port}`));