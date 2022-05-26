import express from "express";
import path from "path";

export const router = express.Router();
const __dirname = path.resolve();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/index.html"));
});

router.get("/doacao", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Views/donate.html"));
});

router.get("/voluntariado", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Views/voluntariado.html"));
});
