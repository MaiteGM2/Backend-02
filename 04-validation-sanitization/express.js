// https://howtodevez.medium.com/using-express-validator-for-data-validation-in-nodejs-6946afd9d67e

import express from 'express';
import usersRoute  from './routes/users.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use('/users', usersRoute);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
