import { openDb } from "../configDB.js";

export async function createTable() {
  openDb().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS Fichas( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,birthDate TEXT, educator TEXT, place TEXT)"
    );
  });
}

export async function insertPessoa(pessoa) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO Fichas (name, birthDate, educator, place) VALUES (?,?,?,?)",
      [pessoa.name, pessoa.birthDate, pessoa.educator, pessoa.place]
    );
  });
}

export async function updatePessoa(pessoa) {
  openDb().then((db) => {
    db.run(
      "UPDATE Pessoa SET name=?, birthDate=?, educator=?, place=?,  WHERE id=? ",
      [pessoa.name, pessoa.birthDate, pessoa.educator, pessoa.place, pessoa.id]
    );
  });
}

export async function selectPessoas() {
  return openDb().then(async (db) => {
    const res = await db.all("SELECT * FROM Fichas");
    return res;
  });
}

export async function selectPessoa(id) {
  return openDb().then(async (db) => {
    const res = await db.get("SELECT * FROM Fichas WHERE id=?", [id]);
    return res;
  });
}

export async function deletePessoa(id) {
  return openDb().then(async (db) => {
    const res = await db.get("DELETE FROM Fichas WHERE id=?", [id]);
    return res;
  });
}
