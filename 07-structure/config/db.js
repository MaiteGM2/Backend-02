const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
      console.error('Error al conectar con la base de datos:', err.message);
    } else {
      console.log('Conectado a la base de datos SQLite');
    }
  });
  
  module.exports = db;