import { openDb } from "../configDB.js";

export async function insertAssisted(item) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO Assisted (assistedId, name, nickname, place, time, approachDate, reason, responsibleId) VALUES (?,?,?,?,?,?)",
      [
        item.name,
        item.nickname,
        item.place,
        item.time,
        item.approachDate,
        item.reason,
        item.responsibleId,
      ]
    );
  });
}

export async function updateAssisted(item) {
  openDb().then((db) => {
    db.run(
      "UPDATE Assisted SET name = ?, nickname = ?, place = ?, time = ?, approachDate = ?, reason = ? WHERE assistedId = ?",
      [
        item.name,
        item.nickname,
        item.place,
        item.time,
        item.approachDate,
        item.reason,
        item.assistedId,
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
    const res = await db.get("DELETE * FROM Assisted WHERE assistedId=?", [id]);
    return res;
  });
}
