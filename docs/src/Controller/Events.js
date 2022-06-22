import { openDb } from "../configDB.js";

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
