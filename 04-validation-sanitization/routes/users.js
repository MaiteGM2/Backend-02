import express from 'express';
import db from "../database/sqlite.js";
import bcrypt from 'bcrypt';
import logger from '../utils/logger.js';
import validateUser from '../utils/validate-user.js';
import errorHandler from '../utils/error-handler.js';
import pkg from 'express-validator';
const { validationResult } = pkg;

const router = express.Router();

router.use((req, res, next) => {
    logger.info(`Solicitud recibida: ${req.method} ${req.url}`, { codeStatus: res.statusCode });
    next();
  });

router.get("/", (req, res) => {
    logger.debug('Obteniendo todos los usuarios');
    db.all("SELECT * FROM users", [], (err, rows) => {
      if (err) {
        logger.error(`Error al obtener usuarios: ${err.message}`, { codeStatus: res.statusCode });
        return res.status(500).json({ error: err.message });
      }

      logger.info(`Se han recuperado ${rows.length} usuarios`);
      res.json(rows);
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    logger.debug(`Buscando usuario con ID: ${id}`, { codeStatus: res.statusCode });

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
});

router.post('/', validateUser, async (req, res) => {
  const errors = validationResult(req);
  const { name, email, password, role } = req.body;
  const saltRounds = 10;

  if (!errors.isEmpty()) {
    logger.warn('Errores en la validación del usuario', { errors: errors.array() }, { codeStatus: res.statusCode });
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    logger.info(`Generando hash de la contraseña para el usuario ${email}`, { codeStatus: res.statusCode });
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, role], function (err) {
      if (err) {
        logger.error(`Error al insertar usuario: ${err.message}`, { codeStatus: res.statusCode })
        return res.status(500).json({ error: err.message });
      }
      logger.info(`Usuario creado con ID ${this.lastID}`, { codeStatus: res.statusCode });
      res.status(201).json({ id: this.lastID, name, email, role });
    });
  } catch (error) {
    logger.error(`Error al generar el hash de la contraseña para ${email}: ${error.message}`, { codeStatus: res.statusCode });
    res.status(500).json({ error: 'Error al generar el hash de la contraseña' });
  }
});

router.use(errorHandler);

export default router;