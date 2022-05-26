import { openDb } from "../configDB.js";

export async function getServices() {
    return openDb().then(async (db) => {
      const res = await db.all("SELECT * FROM Service");
      return res;
    });
}

export async function insertService(item) {
        openDb().then((db) => {
          db.run(
            "INSERT INTO Service (type, time) VALUES (?,?)",
            [item.type, item.time]
          );
        });
      }

export async function deleteService(assistedId) {
    return openDb().then(async (db) => {
          const res = await db.get("DELETE FROM Service WHERE assistedId=?", [assistedId]);
          return res;
        });
      }