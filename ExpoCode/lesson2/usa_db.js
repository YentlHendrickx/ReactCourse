import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('usa.db');
const version = 1;

export default class UsaDB {

  static getPresidents() {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT pr.name, pr.term, pa.name AS party FROM president pr, party pa WHERE pr.partyid = pa.id;",
          [],
          (tx, { rows }) => {
            resolve(rows._array);
          }
        );
      });
    });
  }

  static getPresidentById(id) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM president WHERE id = ?",
          [id],
          (tx, { rows }) => {
            resolve(rows._array[0])
          }
        );
      });
    });
  }

  static deletePresident(id) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM president WHERE id = ?",
          [id],
          (tx, results) => {
            if (results.rowsAffected == 0) {
              resolve(false);
            } else {
              resolve(true);
            }
          },
          resolve(false)
        );
      });
    });
  }

  static updatePresident(president) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE president SET name=?, term=?, partyid=? WHERE id=?",
          [president.name, president.term, president.partyid, president.id],
          (tx, results) => {
            if (results.rowsAffected == 0) {
              resolve(false);
            } else {
              resolve(true);
            }
          },
          resolve(false)
        );
      });
    });
  }

  static insertPresident(president) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO president (name, term, partyid) VALUES (?,?,?)",
          [president.name, president.term, president.partyid],
          (tx, results) => {
            if (results.rowsAffected == 0) {
              resolve(false);
            } else {
              resolve(true);
            }
          },
          resolve(false)
        );
      });
    });
  }

  static create_config_table(db) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS config_table (c_key text primary key, c_value integer);",
          [],
          (tx, results) => resolve(true)
        );
      });
    });
  }

  static insert_version(db) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT OR IGNORE INTO config_table (c_key, c_value) VALUES ('version', 0);",
          [],
          (tx, results) => resolve(true)
        );
      });
    });
  }

  static update_version(db) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT c_value FROM config_table where c_key = 'version'",
          [],
          async (tx, { rows }) => {
            if (rows._array[0].c_value != version) {
              tx.executeSql("UPDATE config_table set c_value = ? where c_key= 'version';", [version]);
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      });
    });
  }

  static async newerVersionDB(db) {
    await this.create_config_table(db);
    await this.insert_version(db);
    return await this.update_version(db);
  }

  static dropTables(db) {
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE IF EXISTS president");
      tx.executeSql("DROP TABLE IF EXISTS party");
    });
  }

  static createTables(db) {
    db.transaction((tx) => {
      tx.executeSql("CREATE TABLE party     (id integer primary key, name text);");
      tx.executeSql("CREATE TABLE president (id integer primary key AUTOINCREMENT, name text, term text, partyid integer, FOREIGN KEY(partyid) REFERENCES party(id));");
    });
  }

  static createParties(db) {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO party (id, name) VALUES (1, 'Republican Party');");
      tx.executeSql("INSERT INTO party (id, name) VALUES (2, 'Democratic Party');");
    });
  }

  static createPresidents(db) {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Roosevelt, Franklin Delano', '1933-1945', 2);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Truman, Harry', '1945-1953', 2);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Eisenhower, Dwight David', '1953-1961', 2);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Kennedy, John Fitzgerald', '1961-1963', 2);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Johnson, Lyndon Baines', '1963-1969', 1);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Nixon, Richard Milhous', '1969-1974', 2);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Ford, Gerald Rudolph', '1974-1977', 1);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Carter, James Earl Jr.', '1977-1981', 1);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Reagan, Ronald Wilson', '1981-1989', 2);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Bush, George Herbert Walker', '1989-1993', 1);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Clinton, William Jefferson', '1993-2001', 1);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Bush, George Walker', '2001-2009', 1);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Obama, Barack Hussein', '2009-2017', 2);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Trump, Donald John', '2017-2021', 1);");
      tx.executeSql("INSERT INTO president (name, term, partyid) VALUES ('Biden, Joseph Robinette', '2021-2025', 2);");
    });
  }

  static async initDb() {
    // await this.newerVersionDB(db)
    if (await this.newerVersionDB(db)) {
      this.dropTables(db);
      this.createTables(db);
      this.createParties(db);
      this.createPresidents(db);

      console.log('database created with version ' + version);
    } else {
      console.log('database is already up to date');
    }
  }

}