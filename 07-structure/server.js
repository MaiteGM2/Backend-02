require('dotenv').config()
const express = require ('express');
const usersRoutes  = require ('./routes/users.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', usersRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


module.exports = app;