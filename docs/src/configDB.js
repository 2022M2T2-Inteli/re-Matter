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
    //Cria uma tabela dos atendidos se ela não existir
    db.exec(
      `CREATE TABLE IF NOT EXISTS Assisted( 
        id INT PRIMARY KEY,
        name TEXT,
        nickname TEXT NOT NULL,
        place TEXT NOT NULL,
        time DATE NOT NULL,
        approachDate DATE NOT NULL,
        reason TEXT,
        idResponsible TEXT NOT NULL)
        FOREIGN KEY(idResponsible) REFERENCES Admin(idAdmin)`
    );
    //Cria uma tabela dos serviços se não existir
    db.exec(
      `CREATE TABLE IF NOT EXISTS Service( 
        idAssisted INT,
        type TEXT NOT NULL,
        time DATE NOT NULL,
        FOREIGN KEY(idAssisted) REFERENCES Assisted(id)`
    );
    // Cria uma tabela dos administradores se ela não existir
    db.exec(
      `CREATE TABLE IF NOT EXISTS Admin( 
        idAdmin INT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email INT NOT NULL,
        number INT NOT NULL`
    );
    // Cria uma tabela dos colaboradores se ela não existir
    db.exec(
      `CREATE TABLE IF NOT EXISTS Collaborator( 
        idCollaborator INT NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        date DATE NOT NULL,
        donation TEXT NOT NULL,
        status TEXT NOT NULL`
    );
    // Cria uma tabela para os logins e senhas
    db.exec(
      `CREATE TABLE IF NOT EXISTS PRUAP( 
        login TEXT NOT NULL,
        password TEXT NOT NULL`
    );
  });
}
