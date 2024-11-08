const db = require ('../database/sqlite.js');
const logger = require ('../utils/logger.js');

const getUserById = (id, res) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) {
          logger.error(`Error al obtener usuario con ID ${id}: ${err.message}`, { codeStatus: res.statusCode });
          return res.status(500).json({ error: err.message });
        }
        if(!row){
          logger.warn(`Usuario con ID ${id} no encontrado`, { codeStatus: res.statusCode });
          return res.status(404).json({ message: "User not found" });
        }
        if (row) {
          logger.info(`Usuario con ID ${id} encontrado`, { codeStatus: res.statusCode });
          res.status(200).json(row);
        }
      });
}

module.exports = getUserById;