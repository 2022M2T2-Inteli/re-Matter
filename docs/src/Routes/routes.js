import express from "express";
import path from "path";

export const router = express.Router();
const __dirname = path.resolve();

// router.all("*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "../../docs/Views/404.html"));
// });

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/index.html"));
});

router.get("/doacao", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Views/donate.html"));
});

router.get("/voluntariado", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Views/voluntariado.html"));
});

router.get("/area-restrita", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Views/area-restrita.html"));
});

router.get("/area-restrita/adm", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Views/adm.html"));
});

router.get("/area-restrita/fichas", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Views/fichasExistentes.html"));
});

router.get("/area-restrita/ficha/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Views/ficha.html"));
});

router.get("/area-restrita/atividades", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Views/services.html"));
});

router.get("/area-restrita/fichas/nova", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Views/newForm.html"));
});

router.get("/area-restrita/fichas/abordagem", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Views/teste.ejs"));
});
