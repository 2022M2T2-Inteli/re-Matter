import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  return open({
    filename: "./fichas.db",
    driver: sqlite3.Database,
  });
}

export async function createDatabase() {
  openDb().then((db) => {
    db.exec(
      `CREATE TABLE IF NOT EXISTS Atendido(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        nickname TEXT,
        birthDate TEXT, 
        educator TEXT,
        date TEXT,
        place TEXT
      )`
    );
  });
}
