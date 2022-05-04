const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.use(express.static("../client"));
app.use(express.static("../client/src/images"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/index.html"));
});

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
