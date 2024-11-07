import express from 'express';
import { logger } from '../middlewares/logger.js';
import { errorHandler } from '../middlewares/error-handler.js';
import { bodyAnalysis } from '../middlewares/body-analysis.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateUser } from '../middlewares/validate-user.js';
import { users } from "../database/users.js";

const router = express.Router();

router.use(logger);
app.use(errorHandler);

router.get('/users', (req, res) => {
    res.json(users);
});

router.get('/users/:id', (req, res) => {
 const userId = parseInt(req.params.id);
 const user = users.find(u => u.id === userId);

 if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
});

app.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'Acceso permitido a ruta protegida' });
});

router.post('/users', bodyAnalysis, validateUser, (req, res) => {
    const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PATCH User
router.patch("/:id", authenticate, (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    user.name = req.body.name;
    user.email = req.body.email;
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.put('/users/:id', bodyAnalysis, (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    users[userIndex] = {
        id: userId,
        name: req.body.name,
        email: req.body.email
    };
    res.json(users[userIndex]);
});

router.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});

export default router;
   