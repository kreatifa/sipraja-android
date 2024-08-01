// SQLite Storage
var db = db || {};

// Application DataBase Configuration
Attachment.openDatabase = function () {
  db = window.sqlitePlugin.openDatabase({
    name: "sipraja.db",
    location: "default",
  });

  // if (!localStorage.db_opened) {
  //   db.transaction(
  //     function (tx) {
  //       let fields = ["id", "name"];
  //       tx.executeSql(
  //         "CREATE TABLE IF NOT EXISTS kt_reg_provinces (" +
  //           fields[0] +
  //           " INTEGER PRIMARY KEY, " +
  //           fields[1] +
  //           ")"
  //       );
  //       get_kt_reg_provinces().forEach(function (row) {
  //         tx.executeSql(
  //           "INSERT OR IGNORE INTO kt_reg_provinces VALUES (?1, ?2)",
  //           [row[fields[0]], row[fields[1]]]
  //         );
  //       });

  //       fields = ["id", "province_id", "name"];
  //       tx.executeSql(
  //         "CREATE TABLE IF NOT EXISTS kt_reg_regencies (" +
  //           fields[0] +
  //           " INTEGER PRIMARY KEY, " +
  //           fields[1] +
  //           " INTEGER, " +
  //           fields[2] +
  //           ")"
  //       );
  //       get_kt_reg_regencies().forEach(function (row) {
  //         tx.executeSql(
  //           "INSERT OR IGNORE INTO kt_reg_regencies VALUES (?1, ?2, ?3)",
  //           [row[fields[0]], row[fields[1]], row[fields[2]]]
  //         );
  //       });

  //       fields = ["id", "regency_id", "name"];
  //       tx.executeSql(
  //         "CREATE TABLE IF NOT EXISTS kt_reg_districts (" +
  //           fields[0] +
  //           " INTEGER PRIMARY KEY, " +
  //           fields[1] +
  //           " INTEGER, " +
  //           fields[2] +
  //           ")"
  //       );
  //       get_kt_reg_districts().forEach(function (row) {
  //         tx.executeSql(
  //           "INSERT OR IGNORE INTO kt_reg_districts VALUES (?1, ?2, ?3)",
  //           [row[fields[0]], row[fields[1]], row[fields[2]]]
  //         );
  //       });

  //       fields = ["id", "district_id", "name"];
  //       tx.executeSql(
  //         "CREATE TABLE IF NOT EXISTS kt_reg_villages (" +
  //           fields[0] +
  //           " INTEGER PRIMARY KEY, " +
  //           fields[1] +
  //           " INTEGER, " +
  //           fields[2] +
  //           ")"
  //       );
  //       get_kt_reg_villages().forEach(function (row) {
  //         tx.executeSql(
  //           "INSERT OR IGNORE INTO kt_reg_villages VALUES (?1, ?2, ?3)",
  //           [row[fields[0]], row[fields[1]], row[fields[2]]]
  //         );
  //       });

  //       localStorage.setItem("db_opened", "true");
  //     },
  //     function (error) {
  //       console.log("Transaction error: " + error.message);
  //     }
  //   );
  // }
};

Attachment.getDbWhere = function (
  { table = "", select = "*", join = [], where = [], order_by = "id DESC" },
  result
) {
  db.transaction(
    function (tx) {
      let query = "SELECT " + select;
      query += " FROM " + table;

      join.forEach(function (item, index) {
        let key = Object.keys(item);
        query += " LEFT JOIN  " + key[0] + " ON " + item[key[0]];
      });

      let values = [];
      if (where.length > 0) {
        query += " WHERE ";
        where.forEach(function (item, index) {
          let key = Object.keys(item);
          if (index > 0) query += " AND ";
          if (String(item[key[0]]).includes("%")) query += key[0] + " LIKE ?";
          else query += key[0] + " = ?";
          values.push(item[key[0]]);
        });
      }

      query += " ORDER BY " + order_by;
      tx.executeSql(query, values, function (tx, rs) {
        let set = [];
        for (let i = 0; i < rs.rows.length; i++) set.push(rs.rows.item(i));
        result(set);
      });
    },
    function (error) {
      console.log("Transaction error: " + error.message);
    }
  );
};

Attachment.insertDb = function ({ table = "", form = {} }, result) {
  db.transaction(
    function (tx) {
      let query = "INSERT INTO " + table + " VALUES (";
      let values = [];
      let index = 1;
      for (const [key, value] of Object.entries(form)) {
        if (index > 1) query += ", ";
        query += "?" + index;
        values.push(value);
        index++;
      }

      query += ")";
      tx.executeSql(query, values, function (tx, rs) {
        result(rs.insertId);
      });
    },
    function (error) {
      console.log("Transaction error: " + error.message);
    }
  );
};

Attachment.insertDbBatch = function ({ table = "", forms = [] }, result) {
  db.transaction(
    function (tx) {
      forms.forEach(function (form) {
        let query = "INSERT INTO " + table + " VALUES (";
        let values = [];
        let index = 1;
        for (const [key, value] of Object.entries(form)) {
          if (index > 1) query += ", ";
          query += "?" + index;
          values.push(value);
          index++;
        }

        query += ")";
        tx.executeSql(query, values);
      });

      result(true);
    },
    function (error) {
      console.log("Transaction error: " + error.message);
    }
  );
};

Attachment.updateDb = function ({ table = "", form = {}, where = [] }, result) {
  db.transaction(
    function (tx) {
      let query = "UPDATE " + table + " SET ";

      let values = [];
      let key = Object.keys(form);
      key.forEach(function (item, index) {
        if (index > 0) query += ", ";
        query += item + " = ?";
        values.push(form[item]);
      });

      if (where.length > 0) {
        query += " WHERE ";
        where.forEach(function (item, index) {
          let key = Object.keys(item);
          if (index > 0) query += " AND ";
          if (String(item[key[0]]).includes("%")) query += key[0] + " LIKE ?";
          else query += key[0] + " = ?";
          values.push(item[key[0]]);
        });
      }

      tx.executeSql(query, values, function (tx, rs) {
        result(rs.rowsAffected);
      });
    },
    function (error) {
      console.log("Transaction error: " + error.message);
    }
  );
};

Attachment.deleteDb = function ({ table = "", where = [] }, result) {
  db.transaction(
    function (tx) {
      let query = "DELETE FROM " + table;

      let values = [];
      if (where.length > 0) {
        query += " WHERE ";
        where.forEach(function (item, index) {
          let key = Object.keys(item);
          if (index > 0) query += " AND ";
          if (String(item[key[0]]).includes("%")) query += key[0] + " LIKE ?";
          else query += key[0] + " = ?";
          values.push(item[key[0]]);
        });
      }

      tx.executeSql(query, values, function (tx, rs) {
        result(rs.rowsAffected);
      });
    },
    function (error) {
      console.log("Transaction error: " + error.message);
    }
  );
};

Attachment.getDbQuery = function ({ query = "", values = [] }, result) {
  db.transaction(
    function (tx) {
      tx.executeSql(query, values, function (tx, rs) {
        let set = [];
        for (let i = 0; i < rs.rows.length; i++) set.push(rs.rows.item(i));
        result(set);
      });
    },
    function (error) {
      console.log("Transaction error: " + error.message);
    }
  );
};
