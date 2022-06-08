import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  return open({
    filename: "./data/database.db",
    driver: sqlite3.Database,
  });
}

export async function createDatabase() {
  openDb().then((db) => {
    //Cria uma tabela dos atendidos se ela não existir
    db.exec(
      `CREATE TABLE IF NOT EXISTS Assisted( 
        assistedId INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        nickname TEXT NOT NULL,
        place TEXT NOT NULL,
        time TEXT NOT NULL,
        beingAttended BOOLEAN NOT NULL,
        observation TEXT,
        approachDate DATE NOT NULL,
        reason TEXT,
        responsibleId INTEGER NOT NULL
      )`
    );
    //Cria uma tabela dos serviços se não existir
    db.exec(
      `CREATE TABLE IF NOT EXISTS Service( 
        serviceId INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        time DATE NOT NULL,
        towelId INTEGER,
        observation TEXT,
        assistedID INTEGER NOT NULL
      )`
    );
    // Cria uma tabela dos administradores se ela não existir
    db.exec(
      `CREATE TABLE IF NOT EXISTS Admin( 
        adminId INTEGER 
        name TEXT NOT NULL,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        phoneNumber INTEGER NOT NULL
      )`
    );
    // Cria uma tabela dos colaboradores se ela não existir
    db.exec(
      `CREATE TABLE IF NOT EXISTS Collaborator( 
        collaboratorId INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        date DATE NOT NULL,
        donation TEXT NOT NULL,
        contact TEXT NOT NULL,
        status TEXT NOT NULL
      )`
    );
    // Cria uma tabela para os logins e senhas
    db.exec(
      `CREATE TABLE IF NOT EXISTS Pruap( 
        login TEXT NOT NULL,
        password TEXT NOT NULL
      )`
    );
  });
}

export const _initializeUsers = async () => {
  const user = {
    username: "soraya.montanheiro",
    password: "soraya123",
    email: "soraya.montanheiro@email.com",
    phoneNumber: "123456789",
  };

  openDb().then((db) => {
    db.run("INSERT INTO Pruap (login, password) VALUES (?,?)", [
      user.username,
      user.password,
    ]);

    db.run("INSERT INTO Admin (name, email, phoneNumber) VALUES (?,?,?)", [
      user.username,
      user.email,
      user.phoneNumber,
    ]);
  });
};
