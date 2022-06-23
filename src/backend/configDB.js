import sqlite3 from "sqlite3";
import { open } from "sqlite";


// Opens the database

export async function openDb() {
  return open({
    filename: "./data/database.db",
    driver: sqlite3.Database,
  });
}

// Creates All tables in the database if they don't exist

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
        createdAt TEXT NOT NULL,
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
        adminId INTEGER PRIMARY KEY AUTOINCREMENT,
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
    
    // Cria uma tabela de lugares se ela não existir
    db.exec(
      `CREATE TABLE IF NOT EXISTS Places( 
        placeId INTEGER PRIMARY KEY AUTOINCREMENT, 
        latitude NUMERIC NOT NULL,
        longitude NUMERIC NOT NULL,
        streetName TEXT,
        assistedName TEXT,
        circleRadius INTEGER
      )`
    );

    // Cria uma tabela para os logins e senhas
    db.exec(
      `CREATE TABLE IF NOT EXISTS Pruap( 
        login TEXT NOT NULL,
        password TEXT NOT NULL
      )`
    );
    // Cria uma tabela para os eventos
    db.exec(
      `CREATE TABLE IF NOT EXISTS Event(
        eventId INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        description TEXT NOT NULL,
        date TEXT NOT NULL
      )`
    );
  });
}

// Initializes main users in the database

export const _initializeUsers = async () => {
  const users = [
    {
      name: "Soraya",
      username: "soraya.revirar",
      password: "soraya123",
      email: "soraya@revirar.com",
      phoneNumber: "123456789",
    },
    {
      name: "Patricia",
      username: "patricia.revirar",
      password: "patricia123",
      email: "patricia@revirar.com",
      phoneNumber: "123456789",
    },
  ];

  users.map(async (user) => {
    openDb().then((db) => {
      db.run(
        `
        INSERT INTO Pruap (login, password) VALUES (?,?) WHERE NOT EXISTS(SELECT 1 FROM Pruap WHERE login = ${user.username})
      `,
        [user.username, user.password]
      );

      db.run(
        `
        INSERT INTO Admin (name, username, email, phoneNumber) VALUES (?,?,?,?) WHERE NOT EXISTS(SELECT 1 FROM Admin WHERE username = ${user.username})
      `,
        [user.name, user.username, user.email, user.phoneNumber]
      );
    });
  });
};

//_initializeUsers();
