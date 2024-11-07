const express = require ('express');
const usersRoute  = require ('./routes/users.js');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/users', usersRoute);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


module.exports = app;