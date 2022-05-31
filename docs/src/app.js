import express from "express";
import { openDb, createDatabase, _initializeUsers } from "./configDB.js";

const TOKEN = process.env.TOKEN || "0987654321";


import {
  deleteAssisted,
  getAssisted,
  getAssisteds,
  insertAssisted,
  updateAssisted,
} from "./Controller/Assisted.js";

import { getCollaborators } from "./Controller/Collaborator.js";

import {
  deleteService,
  getServices,
  insertService,
  updateService,
} from "./Controller/Service.js";

import { router } from "./Routes/routes.js";

const app = express();

app.use(express.static("../"));
app.use(express.static("../../docs"));
app.use(express.json());
app.set("views", "../Views");
app.set("view engine", "ejs");


import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    let assisted = await getAssisteds().then((assisted) => {
      res.render("assisted", {
        action: "list",
        sampleData: assisted
      });
    });
  })
  // inserts user
  .post(async (req, res) => {
    insertAssisted(req.body)
      .then(async () => {
        res.redirect("/api/assisted");
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
    let assisted = await getAssisted(req.params.id);
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
  })
  .delete(async (req, res) => {
    let assisted = await deleteAssisted(req.params.id);
    res.json(assisted);
  });

// "/api/service"

app
  .route("/api/service")
  .get(async (req, res) => {
    let service = await getServices();
    res.send(service);
  })
  .post(async (req, res) => {
    insertService(req.body);
    res.json({
      statusCode: 200,
    });
  });

//"/api/service/:id"
app
  .route("/api/service/:id")
  .delete(async (req, res) => {
    let service = await deleteService();
    res.json(service);
  })
  .put(async (req, res) => {
    if (req.body && !req.params.id) {
      res.json({
        statusCode: 400,
        msg: "Voce precisa informar um assistedId.",
      });
    } else {
      updateService(req.body, req.params.id);
      res.json({
        statusCode: 200,
      });
    }
  });

// "/api/collaborators"
app
  .route("/api/collaborator")
  .get(async (req, res) => {
    let collaborators = await getCollaborators();
    res.send(collaborators);
  })
  .post(async (req, res) => {
    insertCollaborator(req.body);
    res.json({
      statusCode: 200,
    });
  });

// "/api/collaborators/:id"
app
  .route("/api/collaborator/:id")
  .put(async (req, res) => {
    if (req.body && !req.params.id) {
      res.json({
        statusCode: 400,
        msg: "Voce precisa informar um id.",
      });
    } else {
      updateCollaborator(req.body);
      res.json({
        statusCode: 200,
      });
    }
  })
  .delete(async (req, res) => {
    let collaborator = await deleteCollaborator(req.params.id);
    res.json(collaborator);
  });

// "/api/TOKEN/admin/"
app.route(`/api/${TOKEN}/admin`).get(async (req, res) => {
  res.json({
    statusCode: 200,
    msg: "OK",
  });
});

//Inica o servidor
app.listen(PORT, () =>
  console.log(`Server running on port http://127.0.0.1:${PORT}`)
);
