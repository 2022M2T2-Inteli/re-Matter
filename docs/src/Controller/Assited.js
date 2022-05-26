import { openDb } from "../configDB.js";

export async function insertAssisted(item) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO Assisted (name, nickname, place, time, approach, reason, responsibleId) VALUES (?,?,?,?,?,?,?)",
      [item.name,item.nickname, item.place, item.time, item.approach, item.reason, item.responsibleId]
    );
  });
}

export async function updateAssisted(body, id) {
  openDb().then((db) => {
    db.run(
      "UPDATE Assisted SET name=?, nickname=?, place=?, time=?, approach=?, reason=?, responsibleId=?,  WHERE id=? ",
      [body.name, body.nickname, body.place, body.time, body.approach, body.reason, body.responsibleId, id]
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
    const res = await db.get("SELECT * FROM Assisted WHERE id=?", [id]);
    return res;
  });
}

export async function deleteAssisted(id) {
  return openDb().then(async (db) => {
    const res = await db.get("DELETE FROM Assisted WHERE id=?", [id]);
    return res;
  });
}


