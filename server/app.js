import { createTable as createFichaTable } from "./Controller/fichas";

const express = require("express");
const router = require("./router");
const path = require("path");

const app = express();

const port = 3000;

createFichaTable();

app.use(express.static("../"));
app.use(express.static("../docs"));
app.use(express.json());

app.get('/' , function(req, res){
  res.send("Hello world");
})

//app.use("/", router);

app.listen(port, () => {
  console.log(path.join(__dirname, "../"));
  console.log(`App running on http://127.0.0.1:${port}/`);
});
