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
            "INSERT INTO Service (name, nickname, place, time, approach, reason, responsibleId) VALUES (?,?,?,?,?,?,?)",
            [item.name,item.nickname, item.place, item.time, item.approach, item.reason, item.responsibleId]
          );
        });
      }