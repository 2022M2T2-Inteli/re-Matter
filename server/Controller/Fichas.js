import { openDb } from ".configDB";

export async function createTable(){
    openDb().then(db =>{
        db.exec(`
            CREATE TABLE IF NOT EXISTS Ficha( 
                id INTEGER PRIMARY KEY, 
                name TEXT, 
                birthDate INTEGER 
                local TEXT,
                beingAttended BOOL,
                homelessTime INTEGER (homelessTime between 0 and 5),
                educator TEXT
            )
        `)
    })
}
