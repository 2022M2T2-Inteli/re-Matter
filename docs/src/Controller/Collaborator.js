import { openDb } from "../configDB.js";

export async function insertCollaborator(item) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO Collaborator (name, nickname, place, time, approachDate, reason) VALUES (?,?,?,?,?,?)",
      [
        item.name || "Não informado",
        item.nickname,
        item.place,
        item.time,
        item.approachDate,
        item.reason || "Não informado",
      ]
    );
  });
}

export async function updateCollaborator(item) {
  openDb().then((db) => {
    db.run(
      "UPDATE Collaborator SET name = ?, nickname = ?, place = ?, time = ?, approachDate = ?, reason = ? WHERE CollaboratorId = ?",
      [
        item.name,
        item.nickname,
        item.place,
        item.time,
        item.approachDate,
        item.reason,
        item.CollaboratorId,
      ]
    );
  });
}

export async function getCollaborators() {
  return openDb().then(async (db) => {
    const res = await db.all("SELECT * FROM Collaborator");
    return res;
  });
}

export async function getCollaborator(id) {
  return openDb().then(async (db) => {
    const res = await db.get("SELECT * FROM Collaborator WHERE CollaboratorId=?", [id]);
    return res;
  });
}

export async function deleteCollaborator(id) {
  return openDb().then(async (db) => {
    const res = await db.get("DELETE * FROM Collaborator WHERE CollaboratorId=?", [id]);
    return res;
  });
}
