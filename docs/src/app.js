import express from "express";
import { openDb } from "./configDB.js";
import { createRecordDatabase } from "./Controller/Ficha.js";

import { router } from "./Routes/router.js";
import { recordsRouter } from "./Routes/records.routes.js";

const app = express();

app.use(express.static("../../"));
app.use(express.static("../../docs"));
app.use(express.json());

const PORT = process.env.PORT || 3000;

createRecordDatabase();
openDb();

app.use("/", router);
app.use("/area-restrita/", recordsRouter);

app.listen(PORT, () =>
  console.log(`Server running on port http://127.0.0.1:${PORT}`)
);
