import { openDb } from "../configDB.js";

export async function insertCollaborator(item) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO Collaborator (name, type, date, donation, status) VALUES (?,?,?,?,?)",
      [item.name, item.type, item.date, item.donation, item.status]
    );
  });
}

export async function updateCollaborator(item, collaboratorId) {
  openDb().then((db) => {
    db.run(
      "UPDATE Collaborator SET name = ?, type = ?, date = ?, donation = ?, status = ? WHERE collaboratorId = ?",
      [
        item.name,
        item.type,
        item.date,
        item.donation,
        item.status,
        collaboratorId,
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
    const res = await db.get(
      "SELECT * FROM Collaborator WHERE collaboratorId=?",
      [id]
    );
    return res;
  });
}

export async function deleteCollaborator(id) {
  return openDb().then(async (db) => {
    const res = await db.get(
      "DELETE FROM Collaborator WHERE collaboratorId=?",
      [id]
    );
    return res;
  });
}
