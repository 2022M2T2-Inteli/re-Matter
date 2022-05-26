import express from "express";
import { openDb, createDatabase, _initializeUsers } from "./configDB.js";

import { router } from "./Routes/routes.js";
import { apiRouter } from "./Routes/api.routes.js";

const app = express();

app.use(express.static("../"));
app.use(express.static("../../docs"));
app.use(express.json());

const PORT = 5555;

createDatabase();
// _initializeUsers();

openDb();

app.use("/", router);
app.use("/api", apiRouter);

//Inica o servidor
app.listen(PORT, () =>
  console.log(`Server running on port http://127.0.0.1:${PORT}`)
);
