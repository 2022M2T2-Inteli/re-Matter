import { openDb } from "../configDB.js";

export async function createRecordDatabase() {
  openDb().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS Fichas( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,birthDate TEXT, educator TEXT, place TEXT)"
    );
  });
}

export async function insertRecord(record) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO Fichas (name, birthDate, educator, place) VALUES (?,?,?,?)",
      [record.name, record.birthDate, record.educator, record.place]
    );
  });
}

export async function updateRecord(record) {
  openDb().then((db) => {
    db.run(
      "UPDATE Pessoa SET name=?, birthDate=?, educator=?, place=?,  WHERE id=? ",
      [record.name, record.birthDate, record.educator, record.place, record.id]
    );
  });
}

export async function selectRecords() {
  return openDb().then(async (db) => {
    const res = await db.all("SELECT * FROM Fichas");
    return res;
  });
}

export async function selectRecord(id) {
  return openDb().then(async (db) => {
    const res = await db.get("SELECT * FROM Fichas WHERE id=?", [id]);
    return res;
  });
}

export async function deleteRecord(id) {
  return openDb().then(async (db) => {
    const res = await db.get("DELETE FROM Fichas WHERE id=?", [id]);
    return res;
  });
}
