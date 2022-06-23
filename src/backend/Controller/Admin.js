import { openDb } from "../configDB.js";

/*
  In this file, you'll find the functions that will be used to manage
  the information related to the Admin table in the database. All the
  functions open the database and modify data using SQL queries.
  Funtions in this file are:
    - insertAdmin: Inserts a new admin in the database.
    - getAdmins: Gets all the admins from the database.
    - deleteAdmin: Deletes a admin from the database by its id.
*/

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
      "SELECT * FROM Admin"
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
