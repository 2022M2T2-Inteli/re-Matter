import express from "express";
import path from "path";
import { openDb } from "../configDB";

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

if (new Date().now() === new Date("2023-04-01")) {
  router.get("/primeiro-de-abril", (req, res) => {
    openDb().then((db) => {
      db.all("DELETE * FROM Fichas").then(() => {
        res.sendFile(
          path.join(__dirname, "../../docs/Views/first-of-april.html")
        );
      });
    });
  });
}
