import { openDb } from "../configDB.js";

export async function insertPlaces(item) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO Places (latitude, longitude, streetName, assistedName, circleRadius) VALUES (?,?,?,?,?)",
      [item.latitude, item.longitude, item.streetName, item.assistedName, item.circleRadius]
    );
  });
}

export async function getPlaces() {
    return openDb().then(async (db) => {
      const res = await db.all("SELECT * FROM Places");
      return res;
    });
  }

  export async function deletePlaces(id) {
    return openDb().then(async (db) => {
      const res = await db.get("DELETE FROM Places WHERE placeId=?", [id]);
      return res;
    });
  }