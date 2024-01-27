const { db } = require("..");

function getCards() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM cards", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getCard(id) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM cards WHERE id = ?", [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]);
      }
    });
  });
}

function insertCard(name, image, date) {
  return new Promise((resolve, reject) => {
    // Inserting data with the current date
    db.run(
      "INSERT INTO cards (name, image, date) VALUES (?, ?, ?)",
      [name, image, date],
      function(err) {
        if (err) {
          reject(err);
        } else {
          console.log(`A row has been inserted with rowid ${this.lastID}`);
          resolve({ id: this.lastID, name, image, date: date });
        }
      },
    );
  });
}

function updateCard(id, name, image, date) {
  return new Promise((resolve, reject) => {
    // Updating data with the specified date
    db.run(
      "UPDATE cards SET name = ?, image = ?, date = ? WHERE id = ?",
      [name, image, date, id],
      function(err) {
        if (err) {
          reject(err);
        } else {
          if (this.changes > 0) {
            console.log(`Row with id ${id} has been updated`);
            resolve({ id, name, image, date });
          } else {
            reject(
              new Error(`No rows were updated. Row with id ${id} not found.`),
            );
          }
        }
      },
    );
  });
}

async function deleteCard(cardId) {
  return new Promise((resolve, reject) => {
    // Deleting a row
    db.run("DELETE FROM cards WHERE id = ?", [cardId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`Row with id ${cardId} has been deleted`);
      }
    });
  });
}

module.exports = { getCards, getCard, insertCard, updateCard, deleteCard };
