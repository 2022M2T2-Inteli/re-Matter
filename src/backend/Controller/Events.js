import { openDb } from "../configDB.js";

/*
  In this file, you'll find the functions that will be used to manage
  the information related to the Event table in the database. All the
  functions open the database and modify data using SQL queries.
  Funtions in this file are:
    - getEvents: Gets all the events from the database.
    - insertEvent: Inserts an event in the database.
    - updateEvent: Updates an event from the database by its id.
    - deleteEvent: Deletes an event from the database by its id.
*/

export async function getEvents() {
  return openDb().then(async (db) => {
    const res = await db.all("SELECT * FROM Event");
    return res;
  });
}

export async function insertEvent(item) {
  openDb().then((db) => {
    db.run("INSERT INTO Event (title, description, imageUrl, date) VALUES (?,?,?,?)", [
      item.title,
      item.description,
      item.imageUrl,
      item.date,
    ]);
  });
}

export async function updateEvent(item, id) {
  openDb().then((db) => {
    db.run("UPDATE Event SET title=?, description=? imageUrl=?, date=? WHERE eventId=?", [
      item.title,
      item.description,
      item.imageUrl,
      item.date,
      id,
    ]);
  });
}

export async function deleteEvent(id) {
  return openDb().then(async (db) => {
    const res = await db.get("DELETE FROM Event WHERE eventId=?", [id]);
    return res;
  });
}
