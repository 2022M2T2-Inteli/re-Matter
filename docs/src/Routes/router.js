import express from "express";
import path from "path";

const __dirname = path.resolve(path.dirname(""));

export const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/index.html"));
});

router.get("/doacao", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Views/donate.html"));
});

router.get("/voluntariado", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Views/voluntariado.html"));
});
