const { append } = require("express/lib/response");
const sqlite3 = require("sqlite3");
const dbPath = 'dataBase.db'
var db = new sqlite3.Database(dbPath)
const express = require('express')
const app = express()
const PORT = 6969

async function createTable(){
    var sql = `CREATE TABLE IF NOT EXISTS Alunos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        idade INTEGER,
        turma INTEGER,
        ra TEXT
    )`
    db.run(sql,[],(err,res)=>{
        if(err){
            throw err
        }
    })
    db.close()
}
createTable();

app.listen(PORT, () =>
  console.log(`Server running on port http://127.0.0.1:${PORT}`)
);