const express = require("express");
const path = require("path");

// DataBanch
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'forms.db';

const app = express();

const port = 3000;

app.use(express.static("../docs"));
app.use(express.json())

app.get("/", (req, res) => {

  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  var db = new sqlite3.Database(DBPATH);
  var sql = 'SELECT * FROM pessoas';

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    let output = [];
    rows.forEach((row) => {
      output.push(row);
    })
    //res.json(output);
   });
});

app.get('/teste', (req,res) => {
  res.statusCode = 200;
  var db = new sqlite3.Database(DBPATH);
  var sql = 'INSERT INTO pessoas(nome, local, atendimento, tempo, motivos, ajuda, educador, data) VALUES("TESTE", "RUA ABC, XYZ", 1, "1 ano", "asdfghjklkjhgfddfghjk", 1, "XING XONG HU", "20/05/2022")';

  db.run(sql, [], (err, row) => {
    if (err) {
      throw err;
    }
    res.json(row);
  });
});

app.listen(port, () => {
  console.log(`App running on http://127.0.0.1:${port}/`);
});
