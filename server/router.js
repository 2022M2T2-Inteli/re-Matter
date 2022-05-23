const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../docs/index.html"));
});

/*
 * Voluntariado
 */
router.get("/voluntariado", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/screens/voluntariado.html"));
});

/*
 * Doacao
 */
router.get("/doacao", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/screens/donate.html"));
});

/*
 * Area restrita
 */
router.get("/area-restrita", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/screens/area51.html"));
});
router.get("/area-restrita/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/screens/adm.html"));
});

router.get("/area-restrita/doacoes", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/screens/itemlist.html"));
});

router.get("/area-restrita/mapa", (req, res) => {
  res.sendFile(path.join(__dirname, ".../client/src/screens/marcarMapa.html"));
});

router.get("/area-restrita/fichas", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/src/screens/fichasExistentes.html")
  );
});
router.get("/area-restrita/fichas/:id", (req, res) => {});
router.get("/area-restrita/fichas/nova", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/screens/newForm.html"));
});
router.get("/area-restrita/fichas/:id/edit", (req, res) => {});

module.exports = router;
