import express from "express";
import path from "path";

export const router = express.Router();
const __dirname = path.resolve();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

router.get("/doacao", (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/donate.html"));
});

router.get("/voluntariado", (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/voluntariado.html"));
});

router.get("/area-restrita", (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/area-restrita.html"));
});

router.get("/area-restrita/adm", (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/adm.html"));
});

router.get("/area-restrita/fichas", (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/fichasExistentes.html"));
});

router.get("/area-restrita/ficha/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/ficha.html"));
});

router.get("/area-restrita/atividades", (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/services.html"));
});

router.get("/area-restrita/eventos", (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/events.html"));
});

router.get("/area-restrita/fichas/nova", (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/newForm.html"));
});

router.get("/area-restrita/fichas/abordagem", (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/teste.ejs"));
});

router.get("/area-restrita/doacoes", (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/donations.html"));
});

router.get("/area-restrita/admins", (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/admins.html"));
});

router.get("/api", (req, res) => {
  res.send(`
    <a href="/api/assisted">assisted</a>
    <a href="/api/service">service</a>
    <a href="/api/collaborator">collaborator</a>
  `);
});
