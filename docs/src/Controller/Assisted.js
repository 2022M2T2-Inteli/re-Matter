import { openDb } from "../configDB.js";

export async function insertAssisted(record) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO Assisted (name, nickname, place, time, approachDate, reason) VALUES (?,?,?,?,?,?)",
      [
        record.name || "Não informado",
        record.nickname,
        record.place,
        record.time,
        record.approachDate,
        record.reason || "Não informado",
      ]
    );
  });
}

export async function updateAssisted(record) {
  openDb().then((db) => {
    db.run(
      "UPDATE Assisted SET name = ?, nickname = ?, place = ?, time = ?, approachDate = ?, reason = ? WHERE assistedId = ?",
      [
        record.name,
        record.nickname,
        record.place,
        record.time,
        record.approachDate,
        record.reason,
        record.assistedId,
      ]
    );
  });
}

export async function selectAssisteds() {
  return openDb().then(async (db) => {
    const res = await db.all("SELECT * FROM Assisted");
    return res;
  });
}

export async function selectAssisted(id) {
  return openDb().then(async (db) => {
    const res = await db.get("SELECT * FROM Assisted WHERE id=?", [id]);
    return res;
  });
}

export async function deleteAssisted(id) {
  return openDb().then(async (db) => {
    const res = await db.get("DELETE * FROM Assisted WHERE id=?", [id]);
    return res;
  });
}
