const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { calculate } = require("./calculator.js");
require("dotenv").config();

app.use(express.static(__dirname));
// app.use('/', express.static('src'));

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
let cache;
app.post("/operation", (req, res) => {
  const result = calculate(req.body.operations); // pass to calculate function
  const newValue = [req.body.operations.join(" ") + " = " + result]; // construct new result for SQL insert
  const text = `INSERT INTO entries (entry) VALUES ($1)`;
  client.query(text, newValue) // insert then emit to sockets
  .then( result => {
    console.log('success')
    res.send(newValue)
    cache.pop();
    cache.unshift(newValue[0])
    console.log(cache)
    io.emit("operation", cache)
  })
  .catch( err => console.log(err.stack) )
})
/* fetch recent 10 from db on load */
app.get("/recent", (req, res) => {
  client.query('SELECT * FROM entries ORDER BY created_at DESC LIMIT 10')
  .then(result => {
      res.send(result.rows.map(row => row.entry));
      cache = result.rows.map(row => row.entry);
    })
    .catch(err => res.status(404).json(err));
})

// WEB SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("Connection established!");
  socket.on("disconnect", () => {
    console.log('Disconnected.')
  })
});

http.listen(port, () => {
  console.log("listening on *:8080");
});

// PORT
// app.listen(port, () => console.log(`listening on port ${port}`));