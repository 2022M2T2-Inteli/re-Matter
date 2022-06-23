import { openDb } from "../configDB.js";

/*
  In this file, you'll find the functions that will be used to manage
  the information related to the Assisted table in the database. All the
  functions open the database and modify data using SQL queries.
  Funtions in this file are:
    - insertAssisted: Inserts a new assisted in the database.
    - updateAssisted: Updates an assisted in the database by its id.
    - getAssisteds: Gets all the assisteds from the database.
    - getAssisted: Gets an assisted from the database by its id.
    - deleteAdmin: Deletes an assisted from the database by its id.
*/

export async function insertAssisted(item) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO Assisted (name, nickname, place, time, approachDate, beingAttended, observation, reason, responsibleId, createdAt) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        item.name || "",
        item.nickname || "",
        item.place || "",
        item.time || "",
        item.approachDate || "",
        item.beingAttended || "",
        item.observation || "",
        item.reason || " ",
        item.responsibleId || 0,
        item.createdAt,
      ]
    );
  });
}

export async function updateAssisted(item, assistedId) {
  openDb().then((db) => {
    db.run(
      "UPDATE Assisted SET name = ?, nickname = ?, place = ?, time = ?, approachDate = ?, beingAttended = ? WHERE assistedId = ?",
      [
        item.name,
        item.nickname,
        item.place,
        item.time,
        item.approachDate,
        item.beingAttended,
        assistedId,
      ]
    );
  });
}

export async function getAssisteds() {
  return openDb().then(async (db) => {
    const res = await db.all("SELECT * FROM Assisted");
    return res;
  });
}

export async function getAssisted(id) {
  return openDb().then(async (db) => {
    const res = await db.get("SELECT * FROM Assisted WHERE assistedId=?", [id]);
    return res;
  });
}

export async function deleteAssisted(id) {
  return openDb().then(async (db) => {
    const res = await db.get("DELETE FROM Assisted WHERE assistedId=?", [id]);
    return res;
  });
}
