import express from "express";

import {
  selectRecord,
  selectRecords,
  insertRecord,
  deleteRecord,
} from "../Controller/Ficha.js";

export const recordsRouter = express.Router();

recordsRouter.get("/area-restrita/fichas", async (req, res) => {
  let records = await selectRecords();
  res.json(records);
});

recordsRouter.get("/area-restrita/ficha/:id", async (req, res) => {
  let record = await selectRecord(req.params.id);
  res.json(record);
});

recordsRouter.post("/area-restrita/ficha", (req, res) => {
  insertRecord(req.body);
  res.json({
    statusCode: 200,
  });
});

recordsRouter.put("/area-restrita/ficha/:id", (req, res) => {
  if (req.body && !req.body.id) {
    res.json({
      statusCode: 400,
      msg: "Voce precisa informar um id",
    });
  } else {
    insertRecord(req.body);
    res.json({
      statusCode: 200,
    });
  }
});

recordsRouter.delete("/area-restrita/ficha/:id", async (req, res) => {
  let record = await deleteRecord(req.params.id);
  res.json(record);
});
