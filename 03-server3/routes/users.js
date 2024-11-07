import express from 'express';
import db from "../database/sqlite.js";
import { logger } from '../middlewares/logger.js';
import { errorHandler } from '../middlewares/error-handler.js';
import { bodyAnalysis } from '../middlewares/body-analysis.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateUser } from '../middlewares/validate-user.js';
import { authorizeRole } from '../middlewares/authorize-role.js';
import { verifyToken } from '../middlewares/verify-token.js';

const router = express.Router();

router.use(logger);
router.use(errorHandler);

// POST Login
router.post('/users/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) return res.status(500).json({ error: 'Error de base de datos' });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
  
        const token = jwt.sign({ userId: user.id, role: user.role, email: user.email }, 'ariana', { expiresIn: '1h'});
        res.json({ token });
    });
});

router.get("/users", verifyToken, authorizeRole('ADMIN'), (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });

router.get("/users/:id", authenticate, (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row) {
        res.status(200).json(row);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    });
});

// POST Add User
router.post('/users', bodyAnalysis, validateUser, (req, res) => {
    const { name, email } = req.body;

    db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, name, email });
    });
});

// PATCH User
router.patch("/:id", authenticate, (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
  
    db.run(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (this.changes > 0) {
          res.status(200).json({ id, name, email });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
    );
});

// PUT Update User
router.put('/users/:id', bodyAnalysis, (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
  
    db.run(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (this.changes > 0) {
          res.json({ id, name, email });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
    );
});

//DELETE User
router.delete('/users/:id', authenticate, (req, res) => {
    const id = parseInt(req.params.id);
    db.run("DELETE FROM users WHERE id = ?", id, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes > 0) {
        res.status(200).json({ message: `User ${id} deleted` });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    });
});

export default router;
   