import express from "express";

import {
  getAssisted,
  getAssisteds,
  insertAssisted,
  deleteAssisted,
  updateAssisted,
  getAssisted
} from "../Controller/Ficha.js";

export const assistedRouter = express.Router();

assistedRouter.get("/area-restrita/fichas", async (req, res) => {
  let assisteds = await getAssisteds();
  res.json(assisteds);
});

assistedRouter.get("/area-restrita/assisted/:id", async (req, res) => {
  let assisted = await getAssisted(req.params.id);
  res.json(assisted);
});

assistedRouter.post("/area-restrita/ficha", (req, res) => {
  insertAssisted(req.body);
  res.json({
    statusCode: 200,
  });
});

assistedRouter.put("/area-restrita/ficha/:id", (req, res) => {
  if (req.body && !req.body.id) {
    res.json({
      statusCode: 400,
      msg: "Voce precisa informar um id",
    });
  } else {
    updateAssisted (req.body);
    res.json({
      statusCode: 200,
    });
  }
});

assistedRouter.delete("/area-restrita/ficha/:id", async (req, res) => {
  let record = await deleteAssisted(req.params.id);
  res.json(record);
});
