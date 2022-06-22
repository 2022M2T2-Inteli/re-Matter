import { openDb } from "../configDB.js";

export async function insertAdmin(item) {
  openDb().then((db) => {
    db.run(
      "INSERT INTO Admin (name, username, email, phoneNumber) VALUES (?,?,?,?)",
      [item.name, item.username, item.email, item.phoneNumber]
    );

    db.run("INSERT INTO Pruap (login, password) VALUES (?,?)", [
      item.username,
      item.password,
    ]);
  });
}

export async function getAdmins() {
  return openDb().then(async (db) => {
    // get all admins from the tables Admin and Pruap
    const res = await db.all(
      "SELECT * FROM Admin INNER JOIN Pruap ON Admin.username = Pruap.login"
    );
    return res;
  });
}

export async function deleteAdmin(id) {
  return openDb().then(async (db) => {
    const res = await db.get("DELETE FROM Admin WHERE adminId=?", [id]);
    return res;
  });
}
