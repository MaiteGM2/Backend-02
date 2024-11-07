import express from 'express';
const router = express.Router();

import { users } from "../database/users.js";

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

router.post('/users', (req, res) => {
    const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

router.put('/users/:id', (req, res) => {
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
   