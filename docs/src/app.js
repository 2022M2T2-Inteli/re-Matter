import express from "express";
import { openDb, createDatabase, _initializeUsers } from "./configDB.js";

import { router } from "./Routes/routes.js";
// import { apiRouter } from "./Routes/api.routes.js";

import {
  selectAssisted,
  selectAssisteds,
  insertAssisted,
  deleteAssisted,
  updateAssisted,
} from "../Controller/Assisted.js";

const app = express();

app.use(express.static("../"));
app.use(express.static("../../docs"));
app.use(express.json());

const PORT = 5555;

createDatabase();
openDb();
// _initializeUsers();

app.use("/", router);

// /api/assisted
app
  .route("/api/assisted")
  // returns all users
  .get(async (req, res) => {
    let assisted = await selectAssisteds();
    res.send(assisted);
  })
  // inserts user
  .post(async (req, res) => {
    insertAssisted(req.body)
      .then(() => {
        res.json({
          statusCode: 200,
        });
      })
      .catch((err) => {
        res.json({
          statusCode: 500,
          msg: err,
        });
      });
  });

// /api/assisted/:id
app
  .route("/api/assisted/:id")
  .get(async (req, res) => {
    let assisted = await selectAssisted(req.params.id);
    res.json(assisted);
  })
  .put(async (req, res) => {
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

//Inica o servidor
app.listen(PORT, () =>
  console.log(`Server running on port http://127.0.0.1:${PORT}`)
);
