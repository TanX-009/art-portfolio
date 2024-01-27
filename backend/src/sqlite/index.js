const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("src/sqlite/cards.db");

async function initSqlite() {
  return new Promise((resolve, reject) => {
    // Creating a table
    db.run(
      "CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY, name TEXT, image TEXT, date TEXT)",
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
}

module.exports = { initSqlite, db };
