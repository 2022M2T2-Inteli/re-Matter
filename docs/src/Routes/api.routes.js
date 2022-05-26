import express from "express";
import path from "path";

import {
  selectAssisted,
  selectAssisteds,
  insertAssisted,
  deleteAssisted,
  updateAssisted,
  deleteEverything,
} from "../Controller/Assisted.js";

export const apiRouter = express.Router();

/*
 *  Assisted endpoints ( Return all, return individual, insert, update, delete )
 */
apiRouter.get("/api/assisted", async (req, res) => {
  let assisted = await selectAssisteds();
  res.send(assisted);
});

apiRouter.get("/api/assisted/:id", async (req, res) => {
  let assisted = await selectAssisted(req.params.id);
  res.json(assisted);
});

apiRouter.post("/api/assisted", (req, res) => {
  insertAssisted(req.body);
  res.json({
    statusCode: 200,
  });
});

apiRouter.put("/api/assisted/:id", (req, res) => {
  if (req.body && !req.params.id) {
    res.json({
      statusCode: 400,
      msg: "Voce precisa informar um id.",
    });
  } else {
    updateAssisted(req.body);
    res.json({
      statusCode: 200,
    });
  }
});

apiRouter.delete("/api/assisted/:id", async (req, res) => {
  let assisted = await deleteAssisted(req.params.id);
  res.json(assisted);
});

/*
 *  Services endpoints ( Return all, insert, update, delete )
 */
apiRouter.get("/api/services", async (req, res) => {});

/*
 * Collaborator endpoints ( Return all, insert, update, delete )
 */
apiRouter.get("/api/collaborators", async (req, res) => {});
