import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { openDb, createDatabase, _initializeUsers } from "./configDB.js";
const __dirname = path.resolve();

const TOKEN = process.env.TOKEN || "0987654321";

import {
  deleteAssisted,
  getAssisted,
  getAssisteds,
  insertAssisted,
  updateAssisted,
} from "./Controller/Assisted.js";

import {
  getCollaborators,
  getCollaborator,
  insertCollaborator,
  updateCollaborator,
  deleteCollaborator,
} from "./Controller/Collaborator.js";

import {
  deleteService,
  getServices,
  insertService,
  updateService,
} from "./Controller/Service.js";

import { getEvents, insertEvent, updateEvent, deleteEvent } from "./Controller/Events.js";

import { deleteAdmin, getAdmins, insertAdmin } from "./Controller/Admin.js";

import { insertPlace, getPlaces, deletePlace } from "./Controller/Maps.js";

import { router } from "./Routes/routes.js";

const app = express();

app.use(express.static("../"));
app.use(express.static("../frontend"));
app.use(express.static("../frontend/styles/globals.css"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());
app.set("views", "../frontend");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 1234;

createDatabase();
openDb();

app.use("/", router);

// /api/assisted
app
  .route("/api/assisted")
  // returns all users
  .get(async (req, res) => {
    let assisted = await getAssisteds();
    res.json(assisted);
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
    let id = req.params.id;
    let assisted = await getAssisted(id);
    res.json(assisted);
  })
  .put(async (req, res) => {
    if (req.body && !req.params.id) {
      res.json({
        statusCode: 400,
        msg: "Voce precisa informar um id.",
      });
    } else {
      updateAssisted(req.body, req.params.id);
      res.json({
        statusCode: 200,
      });
    }
  })
  .delete(async (req, res) => {
    deleteAssisted(req.params.id);
    res.json({
      statusCode: 200,
      msg: `${req.params.id} deletado de assistidos com sucesso.`,
    });
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
    res.redirect("/area-restrita/atividades");
  });

//"/api/service/:id"
app
  .route("/api/service/:id")
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
  })
  .delete(async (req, res) => {
    await deleteService(req.params.id);
    res.json({
      statusCode: 200,
      msg: `${req.params.id} deletado de serviço com sucesso.`,
    });
  });

// "/api/collaborators"
app
  .route("/api/collaborator")
  .get(async (req, res) => {
    let collaborators = await getCollaborators().then((collaborators) => {
      res.send(collaborators);
    });
  })
  .post(async (req, res) => {
    insertCollaborator(req.body);
    res.redirect("/api/collaborator");
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
    await deleteCollaborator(req.params.id);
    res.json({
      statusCode: 200,
      msg: `${req.params.id} deletado de colaboradores com sucesso.`,
    });
  });

// "/api/TOKEN/admin/"
app
  .route(`/api/${TOKEN}/admin`)
  .get(async (req, res) => {
    const admins = await getAdmins();
    res.send(admins);
  })
  .post(async (req, res) => {
    if (req.body && !req.body.name) {
      res.json({
        statusCode: 400,
        msg: "Voce precisa informar um nome.",
      });
    } else {
      insertAdmin(req.body);
      res.json({
        statusCode: 200,
      });
    }
  })
  .delete(async (req, res) => {
    await deleteAdmin(req.body.id);
    res.json({
      statusCode: 200,
      msg: `${req.body.id} deletado de admins com sucesso.`,
    });
  });

// Events
app
  .route("/api/events")
  .get(async (req, res) => {
    let events = await getEvents();
    res.send(events);
  })
  .post(async (req, res) => {
    if (req.body && !req.body.title) {
      res.json({
        statusCode: 400,
        msg: "Voce precisa informar um title.",
      });
    } else {
      insertEvent(req.body);
      res.json({
        statusCode: 200,
      });
    }
  });

app
  .route("/api/event/:id")
  .put(async (req, res) => {
    if (req.body && !req.params.id) {
      res.json({
        statusCode: 400,
        msg: "Voce precisa informar um id.",
      });
    } else {
      updateEvent(req.body, req.params.id);
      res.json({
        statusCode: 200,
      });
    }
  })
  .delete(async (req, res) => {
    await deleteEvent(req.params.id);
    res.json({
      statusCode: 200,
      msg: `${req.params.id} deletado de eventos com sucesso.`,
    });
  });

// "api/maps"

app
.route("/api/maps")
.get(async (req, res) => {
  let markers = await getPlaces().then((markers) => {
    //console.log(markers);
    res.send(markers);
  });
})
.post(async (req, res) => {
  console.log(req.body);
  insertPlace(req.body);
  res.redirect("/api/maps");
});

app
  .route("/api/maps/:id")
  .delete(async (req, res) => {
    await deletePlace(req.params.id);
    res.json({
      statusCode: 200,
      msg: `${req.params.id} deletado do mapa com sucesso.`,
    });
  });

//Inica o servidor
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
