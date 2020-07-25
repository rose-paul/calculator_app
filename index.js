const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const { Client } = require("pg");
const { calculate } = require("./calculator.js");
require("dotenv").config();
app.use(express.static(__dirname));

// DB CONNECTION
const client = new Client({
  connectionString: process.env.connectionString
})
client.connect().then(() => "connected successfuly").catch(e => console.log(e)).finally(() => client.end );


// ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
/* POST OPERATION TO DB */
app.post("/post", (req, res) => {
  const result = calculate(req.operations);
  client.query(`INSERT INTO entries (entry) VALUES (result})`)
  .then( result => console.log('successful'))
  .catch( err => console.log(err) )
})
/* FETCH RECENT 10 FROM DB ON LOAD */
app.get("/recent", (req, res) => {
  client.query('SELECT * FROM entries ORDER BY created_at DESC LIMIT 10')
  .then(result => {
    console.log(result.rows)
      res.send(result.rows);
    })
    .catch(err => res.status(404).json(err));
})

// WEB SOCKET

// PORT
app.listen(port, () => console.log(`listening on port ${port}`));