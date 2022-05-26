import { openDb } from "../configDB.js";

export async function getServices() {
  return openDb().then(async (db) => {
    const res = await db.all("SELECT * FROM Service");
    return res;
  });
}

export async function insertService(item) {
  openDb().then((db) => {
    db.run("INSERT INTO Service (type, time, assistedId) VALUES (?,?)", [
      item.type,
      item.time,
      item.assistedId,
    ]);
  });
}

export async function deleteService(serviceID) {
  return openDb().then(async (db) => {
    const res = await db.get("DELETE FROM Service WHERE serviceId=?", [
      serviceID,
    ]);
    return res;
  });
}

export async function updateService(item, serviceID) {
  openDb().then((db) => {
    db.run("UPDATE Assisted SET type = ?, time = ? WHERE serviceId = ?", [
      item.type,
      item.time,
      serviceID,
    ]);
  });
}
