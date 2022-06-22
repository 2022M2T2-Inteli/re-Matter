import { openDb } from "../configDB.js";

export async function insertCollaborator(item) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO Collaborator (name, type, date, donation, status, contact) VALUES (?,?,?,?,?,?)",
      [
        item.name || "Anônimo",
        item.type || "Voluntário",
        item.date || today(),
        item.donation || " ",
        item.status || "Pendente",
        item.contact || "Sem contato",
      ]
    );
  });
}

export async function updateCollaborator(item) {
  openDb().then((db) => {
    db.run(
      "UPDATE Collaborator SET name = ?, type = ?, date = ?, donation = ?, status = ?, contact = ? WHERE collaboratorId = ?",
      [
        item.name,
        item.type,
        item.date,
        item.donation,
        item.status,
        item.contact,
        item.collaboratorId,
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

function today() {
  let today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  today = yyyy + "-" + mm + "-" + dd;

  return today;
}