import { openDb } from "../configDB.js";

/*
  In this file, you'll find the functions that will be used to manage
  the information related to the Places table in the database. All the
  functions open the database and modify data using SQL queries.
  Funtions in this file are:
    - getPlaces: Gets all the places from the database.
    - insertPlace: Inserts an event in the database.
    - deletePlace: Deletes an event from the database by its id.
*/


export async function getPlaces() {
  return openDb().then(async (db) => {
    const res = await db.all("SELECT * FROM Places");
    return res;
  });
}

export async function insertPlace(item) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO Places (latitude, longitude, streetName, assistedName, circleRadius) VALUES (?,?,?,?,?)",
      [item.latitude, item.longitude, item.streetName, item.assistedName, item.circleRadius]
    );
  });
}

export async function deletePlace(id) {
  return openDb().then(async (db) => {
    const res = await db.get("DELETE FROM Places WHERE placeId=?", [id]);
    return res;
  });
}