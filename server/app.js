const express = require("express");
const path = require("path");

const app = express();

const port = 3000;

app.use(express.static("../client"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../docs/index.html"));
});

app.listen(port, () => {
  console.log(`App running on http://127.0.0.1:${port}/`);
});
