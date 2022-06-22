import express from "express";
import path from "path";

export const router = express.Router();
const __dirname = path.resolve();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

router.get("/doacao", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/donate.html"));
});

router.get("/voluntariado", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/voluntariado.html"));
});

router.get("/area-restrita", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/area-restrita.html"));
});

router.get("/area-restrita/adm", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/adm.html"));
});

router.get("/area-restrita/fichas", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/fichasExistentes.html"));
});

router.get("/area-restrita/ficha/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/ficha.html"));
});

router.get("/area-restrita/atividades", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/services.html"));
});

router.get("/area-restrita/eventos", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/events.html"));
});

router.get("/area-restrita/fichas/nova", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/newForm.html"));
});

router.get("/area-restrita/fichas/abordagem", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/teste.ejs"));
});

router.get("/area-restrita/doacoes", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/donations.html"));
});

router.get("/area-restrita/admins", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/admins.html"));
});

router.get("/api", (req, res) => {
  res.send(`
    <a href="/api/assisted">assisted</a>
    <a href="/api/service">service</a>
    <a href="/api/collaborator">collaborator</a>
  `);
});
