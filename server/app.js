const express = require("express");
const router = require("./router");
const path = require("path");

const app = express();

const port = 3000;

app.use(express.static("../"));

app.use("/", router);


app.get("/doacao", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/screens/donate.html"));
});

app.listen(port, () => {
  console.log(path.join(__dirname, "../"));
  console.log(`App running on http://127.0.0.1:${port}/`);
});
