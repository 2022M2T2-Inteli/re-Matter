const express = require("express");
const path = require("path");

// DataBanch
const sqlite3 = require("sqlite3").verbose();
const DBPATH = "database.db";

const router = express.Router();

router.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  var db = new sqlite3.Database(DBPATH);
  var sql = "SELECT * FROM pessoas";

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    let output = [];
    rows.forEach((row) => {
      output.push(row);
    });
    res.json(output);
  });

  res.sendFile(path.join(__dirname, "../docs/index.html"));
});

/*
 * TESTE
 */

/*
 * Voluntariado
 */
router.get("/voluntariado", (req, res) => {
  res.sendFile(path.join(__dirname, "../docs/src/screens/voluntariado.html"));
});

/*
 * Doacao
 */
router.get("/doacao", (req, res) => {
  res.sendFile(path.join(__dirname, "../docs/src/screens/donate.html"));
});

/*
 * Area restrita
 */
router.get("/area-restrita", (req, res) => {
  res.sendFile(path.join(__dirname, "../docs/src/screens/area51.html"));
});

router.get("/area-restrita/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../docs/src/screens/adm.html"));
});

router.get("/area-restrita/doacoes", (req, res) => {
  res.sendFile(path.join(__dirname, "../docs/src/screens/itemlist.html"));
});

router.get("/area-restrita/mapa", (req, res) => {
  res.sendFile(path.join(__dirname, ".../client/src/screens/marcarMapa.html"));
});

router.get("/area-restrita/fichas", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../docs/src/screens/fichasExistentes.html")
  );
});
router.get("/area-restrita/fichas/:id", (req, res) => {});

router.get("/area-restrita/fichas/nova", (req, res) => {
  res.sendFile(path.join(__dirname, "../docs/src/screens/newForm.html"));
});

router.get("/area-restrita/fichas/:id/edit", (req, res) => {});

module.exports = router;
