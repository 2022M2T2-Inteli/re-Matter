import { openDb } from "../configDB.js";

export async function getServices() {
  return openDb().then(async (db) => {
    const res = await db.all("SELECT * FROM Service");
    return res;
  });
}

export async function insertService(item) {
  openDb().then((db) => {
    db.run("INSERT INTO Service (type, time, towelId, observation, assistedId) VALUES (?,?,?,?,?)", [
      item.type,
      item.time ? item.time : today(),
      item.towelId || "-",
      item.observation,
      item.assistedID,
    ]);
  });
}

export async function deleteService(serviceId) {
  return openDb().then(async (db) => {
    const res = await db.get("DELETE FROM Service WHERE serviceId=?", [
      serviceId,
    ]);
    return res;
  });
}

export async function updateService(item, serviceId) {
  openDb().then((db) => {
    db.run("UPDATE Service SET type = ?, time = ? WHERE serviceId = ?", [
      item.type,
      item.time,
      serviceId,
    ]);
  });
}

function today(){
  let today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  today = dd + '/' + mm + '/' + yyyy;

  return today;
}